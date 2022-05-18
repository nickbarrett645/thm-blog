---
title: Day 35
date: 2022-05-18
layout: post.njk
tags: daily
---

Today I'm continuing the [Active Directory](https://tryhackme.com/room/activedirectorybasics) module.

## Physical Active Directory
Active directory is made up of servers and on-premise machines.

### Domain Controllers
A Windows server that runs Active Directory Domain Services (AD DS) and has been promoted to a domain controller in the forest.
Domain Controllers:
- Holds the AD DS data store 
- Handles authentication and authorization services 
- Replicate updates from other domain controllers in the forest
- Allows admin access to manage domain resources

### AD DS Data Store
The AD DS Data store holds the databases and processes needed to store and manage directory information like users, groups and services.
The AD DS Data contains:
- Contains the NTDS.dit - a database that contains all the information of an Active Directory domain controller as well as password hashes for domain - Users
- Stored by default in %SystemRoot%\NTDS
- Accessible exclusively by the domain controller

## The Forest
The forest is the container that connects all the pieces of the network together. A forest is a collection of one or more domain trees inside of an Active Directory network.
A forest consists of:
- Trees - A hierarchy of domains in Active Directory Domain Services
- Domains - Used to group and manage objects 
- Organizational Units (OUs) - Containers for groups, computers, users, printers and other OUs
- Trusts - Allows users to access resources in other domains
- Objects - users, groups, printers, computers, shares
- Domain Services - DNS Server, LLMNR, IPv6
- Domain Schema - Rules for object creation

## Users + Groups
AD has four main types of users:
- Domain Admins - This is the big boss: they control the domains and are the only ones with access to the domain controller.
- Service Accounts (Can be Domain Admins) - These are for the most part never used except for service maintenance, they are required by Windows for services such as SQL to pair a service with a service account
- Local Administrators - These users can make changes to local machines as an administrator and may even be able to control other normal users, but they cannot access the domain controller
- Domain Users - These are your everyday users. They can log in on the machines they have the authorization to access and may have local administrator rights to machines depending on the organization.

AD has two types of groups:
- Security Groups - These groups are used to specify permissions for a large number of users
- Distribution Groups - These groups are used to specify email distribution lists. As an attacker these groups are less beneficial to us but can still be beneficial in enumeration.

Here is an outline of the security groups in AD:
- Domain Controllers - All domain controllers in the domain
- Domain Guests - All domain guests
- Domain Users - All domain users
- Domain Computers - All workstations and servers joined to the domain
- Domain Admins - Designated administrators of the domain
- Enterprise Admins - Designated administrators of the enterprise
- Schema Admins - Designated administrators of the schema
- DNS Admins - DNS Administrators Group
- DNS Update Proxy - DNS clients who are permitted to perform dynamic updates on behalf of some other clients (such as DHCP servers).
- Allowed RODC Password Replication Group - Members in this group can have their passwords replicated to all read-only domain controllers in the domain
- Group Policy Creator Owners - Members in this group can modify group policy for the domain
- Denied RODC Password Replication Group - Members in this group cannot have their passwords replicated to any read-only domain controllers in the domain
- Protected Users - Members of this group are afforded additional protections against authentication security threats. See http://go.microsoft.com/fwlink/?LinkId=298939 for more information.
- Cert Publishers - Members of this group are permitted to publish certificates to the directory
- Read-Only Domain Controllers - Members of this group are Read-Only Domain Controllers in the domain
- Enterprise Read-Only Domain Controllers - Members of this group are Read-Only Domain Controllers in the enterprise
- Key Admins - Members of this group can perform administrative actions on key objects within the domain.
- Enterprise Key Admins - Members of this group can perform administrative actions on key objects within the forest.
- Cloneable Domain Controllers - Members of this group that are domain controllers may be cloned.
- RAS and IAS Servers - Servers in this group can access remote access properties of users

## Trusts + Policies
Trusts and policies define how the domain and trees communicate inside the network.
AD has two types of trusts:
- Directional - The direction of the trust flows from a trusting domain to a trusted domain
- Transitive - The trust relationship expands beyond just two domains to include other trusted domains

AD policies are groups of rules that govern how the servers operate.

## Active Directory Domain Services + Authentication
Domain services are services that the domain controller provides to the rest of the domain tree.
Here are some of the default services:
- LDAP - Lightweight Directory Access Protocol; provides communication between applications and directory services
- Certificate Services - allows the domain controller to create, validate, and revoke public key certificates
- DNS, LLMNR, NBT-NS - Domain Name Services for identifying IP hostnames

AD has two main types of authentication that it uses:
- Kerberos - The default authentication service for Active Directory uses ticket-granting tickets and service tickets to authenticate users and give users access to other resources across the domain.
- NTLM - default Windows authentication protocol uses an encrypted challenge/response protocol

## AD in the Cloud
Azure AD acts as the middle man between your users and the on-premises active directory.

The environment of Azure AD is not the same, but has equivalent pieces.

## Practical
The practical for this module is pretty step by step. I turned on the VM and I'm using the browser-based instance.
To get set up I completed the following initial steps:

- I navigated to the `Downloads` directory:
    -`cd Downloads`
- I started the power shell with execution policy bypassed:
    -`powershell -ep bypass`
- I imported the PowerView module:
    - `. .\PowerView.ps1`

The first question was:
"what is the name of the Windows 10 operating system?"
 I ran:
>`Get-NetComputer -fulldata | select operatingsystem`
>
>`operatingsystem`
>
>`----------------`
>
>`Windows Server 2019 Standard`
>
>`Windows 10 Enterprise Evaluation`
>
>`Windows 10 Enterprise Evaluation`

The second question is "what is the second "Admin" name?"
I ran:
>`Get-NetUser | select cn`

I got a list of all the users on the system and one is `Admin2`

The third question is "Which group has a capital "V" in the group name?
I ran:
`Get-NetGroup -GroupName *`
I got a list of all the group names.

The final question was "When was the password last set for the SQLService user?"
I ran:
`Get-NetUser -SPN | ?{$_.memberof -match 'Domain Admins'}`
I got a list of all the fields about this SQLService. One of the fields had to do with when the passwords was last set.

I thought this module was ok, up until the practical part. I don't understand what the exercises were doing and what I was learning about the system. I think there should have been some misconfigured permissions that allowed me to view something and that would have made more of an impact.

