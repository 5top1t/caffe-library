import os

DOMAIN = os.getenv("DOMAIN", "http://localhost:3000")

# AWS conf
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID", "AKIAWB7SRTUNW32AUFF3")

AWS_SECRET_ACCESS_KEY = os.getenv(
    "AWS_SECRET_ACCESS_KEY", "eU5f0zDVflRbiRgWkzHddgFvb97itk3ejbEgKVPq"
)

AWS_STORAGE_BUCKET_NAME = os.getenv("AWS_STORAGE_BUCKET_NAME", "caffe-library-prod")
