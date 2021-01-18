
# Team Standards - Table of Contents <!-- omit in toc -->

- [Coding Conventions](#coding-conventions)
  - [Naming Conventions](#naming-conventions)
  - [Commenting](#commenting)
- [Software and Tools](#software-and-tools)
  - [Development](#development)
  - [Communication](#communication)
  - [Visual Studio Code Extensions](#visual-studio-code-extensions)
- [Committing Code](#committing-code)
  - [Branches](#branches)
  - [Merge Process](#merge-process)
    - [Code Review](#code-review)
  - [M2 Correctional Explanation for DevOps Branch/Merge Strategy](#m2-correctional-explanation-for-devops-branchmerge-strategy)
- [Issue Board Flow](#issue-board-flow)
  - [Issue Statuses](#issue-statuses)


---


# Coding Conventions
Developers shall adhere to the following Coding Standards guidelines for JavaScript provided by MDN:
https://developer.mozilla.org/en-US/docs/MDN/Contribute/Guidelines/Code_guidelines/JavaScript

## Naming Conventions
- `PascalCase` shall be used when naming files and classes (e.g. `ChatContainer`, `NbaApi`).
- `camelCase` shall be used for variables and functions (e.g. `playerTeam`, `userRequest`).
- Variable names should be as descriptive as possible. Don't worry so much about the name being too long (within reason).
- Short, undescriptive variable names hurt code readability more than long, descriptive ones.
- Single letter variable names should only be used within loops.

## Commenting
- Readability of code should not heavily rely on the presence of comments. Developers should aim for code to be readable without them.
- Code that cannot be made easily readable shall be commented when appropriate.
- Functions should be commented following JavaDoc conventions.

```JAVA
/**
 * Brief summary of the function
 * @param [input parameter], with a brief explanation of the expected parameter
 * @return [return value], with a brief explanation of the expected return value
 */
```


# Software and Tools

## Development
- Visual Studio Code
- GitLab
- PuTTY (SSH Client)
- SOCS Linux Server (for bot hosting)
- NodeJS (for bot core)
- HTML/CSS + JS (for front-end website)
- Slack (for bot integration)

## Communication
- Discord (primary, for development collaboration)
- MS Teams (for meetings, course info)
- Email
- Slack (for bot integration)
- SMS (for emergency)
- Moodle (for course info)

## Visual Studio Code Extensions
- [Better Comments], by *Aaron Bond*
  - Improved readability of comments with varying highlights and styles.
- [Code Spell Checker], by *Street Side Software*
  - Spelling checker for source code.
- [ESLint], by *Dirk Baeumer*
  - Linter for JavaScript.
- [Live Server], by *Ritwick Dey*
  - Launch a development local Server with live reload for static and dynamic pages.
- [Live Share], [Live Share Audio], and [Live Share Extension Pack] by *Microsoft*
  - Allows for real-time collaborative development between team members.
- [Markdown All in One], by *Yu Zhang*
  - Improved workflow for generation of markdown documents.
- [Remote - SSH], by *Microsoft*
  - Use VSCode to view and edit code on a remote server.

[Better Comments]: https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments
[Code Spell Checker]: https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker#:~:text=Open%20up%20VS%20Code%20and,and%20reload%20window%20to%20enable.
[ESLint]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
[Live Server]: https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer
[Live Share]: https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare
[Live Share Audio]: https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare-audio
[Live Share Extension Pack]: https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare-pack
[Markdown All in One]: https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one
[Remote - SSH]: https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh


# Committing Code

## Branches
- Unless absolutely necessary, developers should not push changes directly to the master branch.
- Each developer should have their own branch when making changes unless collaborating on a single feature.
- Suggested branch naming conventions includes `branchName-master` or `branchName-initials`.
  - eg. `someBranchName-master` ----> `someBranchName-mvb` (initials for Mitchell Van Braeckel)
- Note: Our team decided that having a branch per developer is more suitable rather than having a branch per individual issue (which the TA agreed with and said was okay).

## Merge Process
- Once a developer has finished making changes in their branch, they shall create a Pull Request to merge their changes into the master branch.
  - Ideally, these changes refer to one story only, but if it makes sense, they can include more.
- Other team members are responsible to conduct light code reviews it, make comments, and discuss improvements.
  - The author will address all discussions, concerns, and comments, by refactoring and improving the code.
  - Merging should only be done once all issues in the merge request have been addressed and fixed (i.e. should not merge when things are still pending/unresolved).
- At least one approval is required to merge, ideally each team member approves before merging.
- Once approval to merge is required, it is merged to master.
- Notice that our team has set up automatic CI/CD for branches and merge requests, where the pipeline includes, building, linting, and running repeatable tests.
  - The pipeline runs on each branch whenever a developer commits/pushes code, thus developers should avoid doing this unless they believe the code is in a working state, including linting and tests.
  - The pipeline also runs on master each time a merge request is attempted to merge to master, where the merge fails if the pipeline fails, therefore allowing the developer to fix issues before trying again.
  - Also, as part of the process, merged branches are deleted after they have been success fully merged.

### Code Review
- For a Pull Request, at least one separate developer must review the changes. They shall make comments as necessary, suggest changes, and use proper language. They shall approve the request once they believe the code meets the aforementioned standards and performs as expected. After this stage has been reached, the merge request is approved for merging. Merges are only successful if the CI/CD pipeline, which includes building, linting, and testing, is also successful.

## M2 Correctional Explanation for DevOps Branch/Merge Strategy

The following mention of what transpired during discussion with TA is just for context of what happened and why this explanation is present. It is not meant to focus on what either party believed to have occurred since it is hearsay for both sides regardless of what either group believes transpired. Please focus on the following part for why our strategy is applicable to single-issue branch/merge strategy for the M2 optional element DevOps, where we have also included discussion of evidence supporting how it was practically applied to merge request during sprint 2. By looking at these, you will be able to more clearly see that a single feature (which was broken down to be in a single story) was added with each merge request (i.e. functionality for features: /playerSingleStat, /playerHighest, /playerLowest).

- This relates to our M2 grade since 6 marks were deducted for something that was approved and accepted by our weekly meeting TA, Bardia Esmaeili. When we asked during a weekly meeting, he confidently answered us that it was okay and approved it after our explanation (note that he also graded our M2) and discussion where we indicated that we were going to do DevOps as an optional element where this applies. After all, this was expected because our strategy was single-issue, but also had a per-developer focus and is appropriate. As this was just a simple mistake, it has been confirmed with the professor that our M2 grade can be corrected and updated. The professor said that she will personally take a look at this after the M3 deadline and adjust our M2 mark.
- Our team discussed the DevOps optional element with our TA, during the Nov 4 weekly TA meeting, where he confirmed and gave approval for this specific part relating to the branch/merge strategy. Our team asked a question to confirm if our strategy was acceptable during one of our weekly TA meetings. Our TA, confirmed that it was acceptable, so we left our strategy as is without changing it. There was no discrepancy during this discussion because we made it explicit and clear what we were doing by showing the rubric (by taking a screen shot it for the meeting) as well as sharing our screen to view current documentation. Our TA answered confidently and approved, whereas for our other question relating to the M2 Testing optional element about testing and coverage, he was not sure and checked with Judi (like what has happened for many other questions). After checking with Judi, we received an answer from him via the Chatron MS Teams channel. In addition, we have meeting notes documenting that the question was asked and he approved. Also, each member of our team was present, remembers this discussion, and can also confirm this question and its answer. Despite all of this, there seemed to be some kind of miscommunication or misunderstanding between the two parties and this explanation is to clarify that everything was fine for M2.

For context, it was approved during the discussion with the TA when we explained how it was per issue/story/feature, but with a per-dev focus. After explaining, he approved. In this section for [Committing Code](#committing-code), we discuss our branch/merge strategy, including [Branches](#branches), [Merge Process](#merge-process), and [Code Review](#code-review).

- Let's explain how it makes sense for us to keep our existing strategy because it still works and is single-issue as well as per developer, as well as give some examples of our merge requests to make it clear that each was for a single-issue:
  - Essentially, we focus on each developer having their own branch where changes made refer to one issue only. If developers are collaborating, there is an exception for them to work together on one of their branches. From this, you can see that it still is a single issue branch/merge strategy, but we focused it on each developer having a branch. Therefore, our strategy is single-issue, but also per-developer.
  - Using our merge requests as evidence, you will be able to see that each branch was created under a developer and used for a single merge request that related to a single issue (exception for refactoring issues/stories), where the branch was deleted after successfully merging.
  - All the points are references in our submission. We asked because this was still a single-issue strategy but not the exact same as stated in the grading rubric. Since the TA approved after we explained (similar to just now), we did not think it was necessary to fully convert the docs to reflect the slight differences. Especially because we screen share while bringing up questions so the TA can see exactly what we are talking about so there is no confusion or discrepancies in understanding between both parties.
  - This explains why we asked such a question even though it was clear in the grading rubric ("Single-issue branch/merge strategy in place for project"): because we had something very similar already in place and wanted to confirm if it was acceptable with relation to the optional element for M2.

- In this section for [Committing Code](#committing-code), you can see that our rules still follow the single-issue branch/merge strategy, but focused on per developer (which we talked about during the meeting). We explicitly note that our team focuses on a per-developer basis rather than per-issue; however, there is an exception that each member should have their own branch "unless collaborating on a single feature". In other words, this emphasized part means that we still only use one branch for each issue and that it's just owned by a single developer. Any collaborators will also use that branch since they will be communicating and collaborating with the branch owner / primary developer. Lastly, we state that changes for a branch "refer to one story only", including an exception for the rare times it may make sense to include changes for multiple issues/stories (ie. related issues/stories, or refactoring where it affects work from multiple previous issues/stories). Although the benefits of having only changes for a single issue contained within one merge requests are obviously clear, there are still cases where it is beneficial to include changes for multiple issues/stories (especially when they are related or for overall refactoring stories, where the functionality of multiple issues' features is impacted).

- Furthermore, when viewing our team's merge requests for M2, you can see that we followed the plan and strategy we outlined. For instance, we decided Seegal would be the primary developer/owner for issues (he wanted to be the main programmer) and all collaborators just used "his" branch as he was the primary. Therefore, we were using a single branch for each issue and not complicating things as much (which was one of the intentions of our strategy/plan using the per-developer focus). Moreover, when looking at the affected issues/stories of a merge request, you can see that this was for a single issue/story (exception for the overarching epic/super-stories because in this case we are obviously referring to the broken-down subtasks/stories). Thus, our practical application of merge request also shows we were following the "single-issue branch/merge strategy in place" for our project even though we had a per-developer focus. For example, the most recent 4 merge requests for M2: refactoring, and then each of the next 3 for a specific feature/issue/story. By looking at these, you will be able to more clearly see that a single feature (which was broken down to be in a single story) was added with each merge request (i.e. functionality for features: /playerSingleStat, /playerHighest, /playerLowest).

- In conclusion, we asked about this in order to confirm if our strategy was appropriate and acceptable, especially with regards to the M2 submission and evidence for the DevOps optional element. Our strategy covers it, but with a per-developer focus (which is outlined above) and that may have made it a bit misleading (and this is why we asked the TA to confirm it was acceptable in advance). Despite this, our existing strategy still follows a single-issue branch/merge strategy as we have detailed above. Thank you once again to our TAs and professor for looking into this to help sort out this hiccup and correcting our team's grade for Milestone 2!

# Issue Board Flow
- Epics are treated as "labels", and appropriate tasks/stories have those labels added.
- Task names follow the user story format, e.g. "**As a** *{role}*, **[I/we] want** _________ **so that** _________".
- Task issue description should also have the acceptance criteria specified.
  - Acceptance Criteria follows the format: "**Given** ___, **When** ___, **Then** ___".
  - Acceptance Criteria must have the above format but can also contain other notes about desired outcome.
- **Definition of Done (DoD)** is defined as an issue that has successful been reviewed from the "In Review" status and been accepted and approved to be marked as "Done" by both the team and client/PO (see "In Review" and "Done" Issue Statuses below). Also, note that "Done" stories are only "Closed" at the end of a sprint before the next sprint if they meet all elements of the DoD.

## Issue Statuses
- **Open** = task issue not completed
- **To Do** = task issue planned to be completed (in this sprint / for this milestone), but may be a stretch goal depending on priority
- **In Progress** = task issue currently being worked on (in this sprint / for this milestone): analyze problem, plan/design a solution, implement solution, and test solution
- **In Review** = task issues waiting for team review, acceptance criteria confirmation, and/or PO approval
- **Done** = task issues that are completed (in this sprint / for this milestone), including review, satisfying acceptance criteria, receiving PO approval, and achieving DoD
- **Closed** = done task issues from previous sprints/milestones
  - Issues are *Closed* at the end of the sprint, before the start of the next sprint
- NOTE: If there is no assignee, everyone or anyone can work on it as long as they communicate with the team.
- NOTE: If there are assignee(s), another team member can work on the task as long as they communicate with the team beforehand and obtain permission.

[Group Biography]: /GroupBiography
