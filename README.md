# nodeapp-deploy-via-freestyle-CICD 
**Automated Node.js deployment using Jenkins freestyle jobs like pull, install, deploy with modular job chaining for scalable CI/CD.**

---

## **About the Project:**

The objective of this project is to design and implement a **complete CI/CD pipeline** for a Node.js application using **Jenkins Freestyle Jobs**. The pipeline is modular, scalable, and follows a chained-job architecture where every phase of the delivery cycle is handled by a dedicated job:

1. **Code Pull Job** – Fetches latest source code from GitHub
2. **Dependency Install Job** – Installs Node.js packages using NPM
3. **Deployment Job** – Deploys the application to a target server node-app-server
4. **Optional Test Job** – Runs unit tests before allowing deployment

---

## **Technologies Used:**

- **Jenkins** → Automation server to manage CI/CD jobs
- **Freestyle Jobs** → Simple, modular Jenkins jobs for each pipeline stage
- **Git / GitHub** → Version control and code hosting
- **Node.js** → Runtime environment for the application
- **NPM** → Dependency manager for Node.js
- **EC2 / Linux Server** → Deployment target (SSH-based)
- **SSH Keys** → Secure authentication for deployment
- **Build Triggers** → Webhooks / periodic builds
- **Jenkins Plugins** → Git plugin, NodeJS plugin, SSH plugin

---

## **Prerequisites:**

- A Linux machine or EC2 server with Jenkins installed
- GitHub repository containing the Node.js application
- Node.js & NPM installed on build server or Jenkins node
- SSH key pair for deployment
- Access to target deployment server
- Basic knowledge of Git, Jenkins, and Linux

---

## **What is CI/CD?**

**Continuous Integration (CI)** automatically pulls code and builds it whenever changes are committed.

**Continuous Deployment (CD)** automatically deploys the application after successful builds.

---

## **What is a Jenkins Freestyle Job?**

A **Jenkins Freestyle Job** is a simple, customizable job type that supports:

- Shell scripts
- Build triggers
- Build artifacts
- Job chaining
- Post-build actions

In this project, each stage of the CI/CD pipeline is implemented as a separate freestyle job.

---

## Stage of the CI/CD pipeline:

1. **Pull:** Fetch the latest source code from the version control system (like Git) to ensure the build starts with the most current changes.
2. **Install:** Set up the necessary environment by installing all required software dependencies and packages to prepare the application for execution.
3. **Test:** Automatically execute unit, integration, and end-to-end tests to validate the application's functionality, stability, and code quality.
4. **Deploy:** Release the validated and tested application artifact to a target environment (staging or production) to make it available to users.

---

## **Pipeline Structure:**

**Pull → Install → Test → Deploy**

![Project Screenshot](/images/cicd-process.png).

---

## Step 1: Start Jenkins Server

1. Go to AWS console → EC2 Services
2. Start Jenkins server

![Project Screenshot](/images/jenkins-start.png).

---

## **Step 2: Create the Pull Job**

1. Go to Jenkins Dashboard → **New Item**
2. Enter job name: **node-pull-job** 
3. Select **Freestyle project**
4. Desc: This job pull data on GitHub
5. Under **Source Code Management**, select Git and enter your repo URL
6. Scroll to **Build → Execute shell** and paste this code:

```bash
rm -rf project
git clone https://github.com/rahullengare/nodeapp-deploy-via-freestyle-CICD project
```
![Project Screenshot](/images/node-pull-job.png).
![Project Screenshot](/images/node-pull-job1.png).
![Project Screenshot](/images/node-pull-job2.png).
![Project Screenshot](/images/node-pull-job3.png).

7. Save the job
8. Build to verify code pulls correctly

---

## **Step 3: Create the Dependency node Job**

1. Create a new item → **node-install-job**
2. Select **Freestyle project**
3. Desc: This job to install node or there package
4. Under **Build → Execute shell** paste this code:

```bash
sudo apt update -y
sudo apt install -y nodejs
```
![Project Screenshot](/images/node-install-job.png).
![Project Screenshot](/images/node-install-job1.png).
![Project Screenshot](/images/node-install-job2.png).

5. Save the job
6. Build to ensure Node.js and NPM install correctly

---

## **Step 4: Create the NPM Install Job**

1. Create new item → **npm-install-job**
2. Select **Freestyle project**
3. Desc: This job to install node or there package
4. Under **Build → Execute shell** paste this code:

```bash
rm -rf project
git clone https://github.com/rahullengare/nodeapp-deploy-via-freestyle-CICD project
cd project
sudo apt install -y npm
```
![Project Screenshot](/images/npm-job.png).
![Project Screenshot](/images/npm-job1.png).
![Project Screenshot](/images/npm-job2.png).

5. Save the job
6. Run the job to verify installation

---

## **Step 5: Check Installed Versions**

1. SSH into the Jenkins Server

Use your local system terminal to connect to Jenkins EC2:

```bash
ssh -i "pem-server-key.pem" ubuntu@ec2-54-210-22-38.compute-1.amazonaws.com
```
![Project Screenshot](/images/connect.png).

2. Verify **Node** & **NPM** on Jenkins Server

Run:

```bash
node -v     #v18.19.1
npm -v      #9.0.2
```
![Project Screenshot](/images/version-done.png).

---

Now Your Node application are run successfully
