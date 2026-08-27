                    Developer
                         |
                         |
                   git push / MR
                         |
                         v
                   GitLab Repository
                         |
                         |
                  GitLab CI Pipeline
                         |
     ------------------------------------------------
     |                 |                |            |
   Test            SonarQube          Build       Docker
     |                 |                |            |
     |                 |                |            |
 Node Tests       Code Analysis    Compile App   Build Images
 (Jest/Lint)      Quality Check    (Next.js)     (Buildx)
     |                 |                |            |
     ------------------------------------------------
                         |
                         v
                   Harbor Registry
                         |
                         |
                  Stored Docker Images
                         |
                         v
                  Trivy Security Scan
                         |
                         |
                 Vulnerability Report
                         |
                         |
                  (Future Deployment)
                         |
                         v
                  Kubernetes Cluster