---
layout: post
title: Go, Template Permissions
status: public
type: post
published: true
author: Go Team
---


"Go System Administrator' has access to all administrative functions, and has operational access to all parts of a Go installation, which differentiates the normal user from the admin user. Hence, this role cannot be assigned to every user in the system. This requirement demands a new set of  roles in the system which is a subset of the privileges that the super admin has and at the same time does not give full fledged access to the system. Currently in GO, we have one such super admin role subset, which is called pipeline admin. In Go 13.4, we are introducing a new role into the ecosystem called "The Template Admin".

Let us consider a project which uses GO for CD and CI. The team has 10 team members and all are users of the GO system. Here all the pipelines are based on [templates](http://www.thoughtworks.com/insights/blog/how-do-i-do-cd-go-part-5-power-pipeline-templates-and-parameters). Typically, only a  'Go System Administrator'  has the privilege to edit the template. This means that every user needs to approach the super admin for all the changes that need to be made to the template, even if the change is trivial. With the introduction of this new role called template admin, the super admin can assign any user as template admin to a specific template.

Template administrators can view and edit the templates (to which they have permissions), from the template tab of the admin page. Template Administrators, will however not be able to add, delete or change permissions for a template. They will also be able to see the number of pipelines in which the template is being used, but not the details of those pipelines.To edit the permissions for a template, navigate to the "Templates" tab on the "Admin" section:

###Pipeline Templates:

![](/images/blog/Pipeline1.png)

Then, click the "Permissions" link for the template, you want to manage permissions for:

![](/images/blog/Permissions1.png)

More information on this is available in the [13.4 help documentation](http://www.go.cd/documentation/user/current/configuration/pipeline_templates.html#editing-pipeline-templates).


<div class="highlight">This post is also cross-posted <a href="http://www.thoughtworks.com/insights/blog/go-template-permissions">here</a>.</div>