import os

DOMAIN = os.getenv("DOMAIN", "http://localhost:3000")

# AWS
AWS_PROFILE = os.getenv("AWS_PROFILE", "caffe-library-prod")
AWS_STORAGE_BUCKET_NAME = os.getenv("AWS_STORAGE_BUCKET_NAME", "caffe-library-prod")
