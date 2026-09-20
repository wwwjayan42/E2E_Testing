pipeline {
    agent any

    tools {
        nodejs 'NodeJS_20' // Make sure this name matches in Jenkins > Manage Jenkins > Tools
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }
        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install --with-deps'
            }
        }
        stage('Run E2E Tests') {
            steps {
                bat 'npm run test'
            }
        }
    }

    post {
        always {
            // Archive report if you have it
            archiveArtifacts artifacts: '**/reports/**', allowEmptyArchive: true
        }
        failure {
            echo 'Build Failed - Check Console Output'
        }
    }
}