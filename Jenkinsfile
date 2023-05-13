pipeline {
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
            docker.withRegistry('','dockerhub'){
                IMAGE_NAME.push()
            }
          }
        }
      }
    }

    stage('Build, Test and Push Backend Image') {
      environment {
        IMAGE_NAME = ''
      }
      steps {
        dir('server') {
          script {
            IMAGE_NAME=docker.build "akashanand842/recipe-backend"
            docker.withRegistry('','dockerhub'){
                IMAGE_NAME.push()
            }
          }
        }
      }
    }

    stage('Deploy with Ansible') {
      steps {
        script {
            ansiblePlaybook becomeUser: null, colorized: true, disableHostKeyChecking: true, installation: 'Ansible', inventory: 'ansible-deploy/inventory',
            playbook: 'ansible-deploy/ansible-book.yml', sudoUser: null
        }
      }
    }
  }
}
