> :Hero src=https://source.unsplash.com/3fPXt37X6UQ/1900x600,
>       mode=light,
>       target=desktop,
>       leak=156px

> :Hero src=https://source.unsplash.com/3fPXt37X6UQ/1200x600,
>       mode=light,
>       target=mobile,
>       leak=96px

> :Hero src=https://source.unsplash.com/3fPXt37X6UQ/1900x600,
>       mode=dark,
>       target=desktop,
>       leak=156px

> :Hero src=https://source.unsplash.com/3fPXt37X6UQ/1200x600,
>       mode=dark,
>       target=mobile,
>       leak=96px

> :Title shadow=0 0 8px black, color=white
>
> Successful cloud adoption primer!

> :Author src=github

<br>

Whenever I help customers adopt the Azure cloud, I find myself talking about the same basic design principles all the time. So, I decided that to share some of my thoughts in this article. I want to discuss some of my major **design principles and practices** when it comes to the diffusion of cloud computing technologies and making the cloud **enterprise ready**. Almost all those principles are not of technical nature per se, but they are enforced/leveraged by using technical tools. Regardless, my major hypothesis for a successful cloud adoption in an enterprise is:

**<center><blockquote>The successful adoption of the cloud is all about company culture!</center></blockquote>**

# Shift Responsibilities
If you work or lead a centralized IT department, you have to take the role of an enabler, instead of a blocker or manual cloud custodian! Responsibilities can be shifted towards the Business Unit if wanted and needed. They think they can do it better?

**<center><blockquote>Give them the choice and let them try; Shift the responsibility!</center></blockquote>**

There are more than enough tasks you need to worry about! Maybe they can fulfill the requirements as well as you can. If it turns out that they cannot: you can help them. 😊

Depending on their needs, you can either develop a default service that you want to offer (e.g. Centralized CI/CD Platform) or introduce/position yourself as an internal consulting department that helps them with for e.g. introducing their own tool or fulfilling the needed security requirements!

So, if you do go ahead with such a plan, introduce at least three types of maturities or operation models that you want to support within your enterprise:

1. **AppOps** - Application Team mostly works with 3rd party software or solely IaaS components and still needs somebody that “installs the Security Updates” and manages other aspects of the operating system.

    *For example: SAP-Operations*

2. **DevOps** - Application team uses modern deployment and management tools to develop and enhance their product. 

    *For example: Azure Kubernetes Service (AKS)*

3. **SandBox** - Developer wants to experiment and qualify an Idea/PoC     
    
    *For example: Try out Azure Webapps for company website*

For each type described above, you offer different levels of services depending on the needs of the target group as already mentioned before. Some might just need an Enterprise Ready Subscription, while others need more intensive support!  

# Drive Security
Having introduced those different types of cloud maturities, you need to define proper guardrails for each maturity grade. There should be a different set of default security measures for each of them. Find the right balance between security by default and keep in mind:

**<center><blockquote>Enforce where needed, audit/trust when appropriate</center></blockquote>**

Leverage tools that gives you quick wins: Configuring Azure Security Center (ASC) properly delivers for you and your environment some valuable data that helps you review and improve your security posture. The idea is to start of slow, don’t “overdo” it. Instead, introduce and offer products/services that helps with compliance of security requirements easier. Remember that you don’t have to introduce everything at once.

**<center><blockquote>People will find ways to go around your measures if they are too strict!</center></blockquote>**

Creating an unsupervised account with their private/company credit card is done in minutes! Therefore, you want to find the right balance and help them onboard security products as seamlessly as possible.

A good segmentation strategy according to Mark Simos:  

1. **Enables Operations** – Minimizes operation friction by aligning to business practices and applications

2. **Contains Risk** - Adds cost and friction to attackers by:
   1. Isolating sensitive workloads from compromise of other assets
   2. Isolating high exposure systems from being used as a pivot to other systems

3. **Is Monitored** – Security Operations should monitor for potential violations of the integrity of the segments (account usage, unexpected traffic, etc.)

# Enhance Transparency

One major opportunity that comes with cloud computing is the possibility to enhance business transparency throughout your IT driven enterprise. Financial questions like: How much is this business unit consuming can be answered quite easy. This allows you to: 

**<center><blockquote>Become a Profit Center instead of a Cost Center!**</center></blockquote>

Additionally, you can leverage Security/Compliance services that allow you to improve your governance posture. But keep in mind, when we talk about governance and compliance: 

**<center><blockquote>Compliant does not equal Secure; But it’s a start!</center></blockquote>**

Oversee your whole Azure Estate using Single plan of glass services like Azure Security Center (ASC) and Azure Policies to audit first (Enterprise wide): You can see how your defined guidelines and -rails are used and followed. This will eventually let you foresee where you need to improve or enforce!

# Encourage Sandboxing
You should experiment more and your company too! Proof of Concepts (PoC) are usually not expensive in the cloud. Meaning: if you or a business unit has an idea, them it out!

**<center><blockquote>Foster and Empower ideas rather than shutting them down!</center></blockquote>**

Planning and proper testing is obviously still very relevant but what good does it do if you have planned perfectly but it took you 2 years to implement it? The cloud changes from day to day, whatever you wrote a year ago might not be applicable anymore…

**<center><blockquote>Introduce Proof of Concepts (PoC) in early stages!</center></blockquote>**

Let me give you another example: You can plan the migration of a lot of VMs to Azure for years, but without proper experimentation or Proof of Concepts (PoC) from the get-go, your team and you won't learn valuables lessons on how to work within the cloud while planning the operations. Eventually, too much analyzing results in lower motivation and subsequent frustration.

# Use native tools
You should use native tools and aligned with Microsoft, to be sure your feedback is considered when releasing new features.

**<center><blockquote>New capabilities are swiftly available within your environments!</center></blockquote>**

Sure, sometimes it takes longer while other times it will be quicker however, in most cases, Azure provides a service change/improvement quite quickly (remember Windows releases?). Choosing native services you might have to do some trade-offs when it comes to functionality, as not everything you want will be there on day one but Cloud Solution Architects, like myself, are there to help you use those products and help improve them by giving feedback to the product group that develops them.

**<center><blockquote>Experiment with services in Preview!</center></blockquote>**

They are mostly free of charge and by using them and giving us feedback: you can indirectly or in some cases directly influence the product roadmap!

# Closing
Are you interested in beginning your own cloud adoption journey and want to talk more in detail? Feel free to engage with me 😊 

Are you interested an **Enterprise-Ready** Azure Subscription Blueprint? Check out my Github repository: https://github.com/lpassig/AzureSpokeBlueprint 

There I have published a blueprint that creates a fully functional spoke landing zone that can be provided by the central IT and used by business units.

Let me know what you think!

Cheers!

---

