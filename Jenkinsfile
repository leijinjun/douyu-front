pipeline {
    agent {
        docker {
            image 'node:6-alpine'
            args '-p 12345:12345'
        }
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
    }
}
