pipeline {

    environment{
            DOCKERHUB_CREDENTIALS = credentials('dockerhub')
    	}
  agent any

  stages {
    stage('Git Pull') {
        steps {
            git branch: 'sameeksha', url: 'https://github.com/akashanand842/RecipeMedia-SPEMajor.git'
        }
    }

    stage('Build and Push Frontend Image') {
      environment {
        IMAGE_NAME = ''
      }
      steps {
        dir('client') {
          script {
            // sh 'docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .'
            // sh 'docker login -u ${DOCKER_HUB_USERNAME} -p ${DOCKER_HUB_PASSWORD}'
            // sh 'docker push ${IMAGE_NAME}:${IMAGE_TAG}'
            IMAGE_NAME=docker.build "akashanand842/recipe-frontend"
            docker.withRegistry('','secret-key'){
                IMAGE_NAME.push()
            }
          }
        }
      }
    }

    stage('Build and Push Backend Image') {
      environment {
        IMAGE_NAME = ''
      }
      steps {
        dir('server') {
          script {
            // sh 'docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .'
            // sh 'docker login -u ${DOCKER_HUB_USERNAME} -p ${DOCKER_HUB_PASSWORD}'
            // sh 'docker push ${IMAGE_NAME}:${IMAGE_TAG}'
            IMAGE_NAME=docker.build "akashanand842/recipe-backend"
            docker.withRegistry('','secret-key'){
                IMAGE_NAME.push()
            }
          }
        }
      }
    }

    stage('Deploy with Ansible') {
      steps {
        // withCredentials([usernamePassword(credentialsId: 'user-id', usernameVariable: 'SSH_USER', passwordVariable: 'SSH_PASS')]) {
        //   sh 'echo "AKASH_USER=$SSH_USER"'
        //   sh 'echo "AKASH_PASS=$SSH_PASS"'
        //   script {
        //     ansiblePlaybook becomeUser: null, colorized: true, disableHostKeyChecking: true, installation: 'Ansible', inventory: 'ansible-deploy/inventory',
        //     playbook: 'ansible-deploy/ansible-book.yml', sudoUser: null
        //   }
        // }
        script{
          sh 'ansible-playbook ansible-deploy/ansible-book.yml -i ansible-deploy/inventory --user akash --extra-vars "ansible_become_pass=123"'
        }
      }
    }
  }
}
