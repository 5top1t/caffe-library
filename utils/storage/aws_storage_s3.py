import os
import json
import boto3
import math
import requests
import urllib.request as urllib
from botocore.exceptions import ClientError
import settings

session = boto3.Session(profile_name=settings.AWS_PROFILE,)

MAX_PG = 56

def migrate_images_to_s3():
    """
    Migrate large images due to s3 cost.

    """
    start = 56

    for page in range(start, MAX_PG+1):
        for book in query_books(page):
            isbn = book["isbn"]
            im_url_l = book["image_url_l"]
            object_name = get_id(im_url_l)

            upload_book_image_to_s3(
                im_url_l, 
                settings.AWS_STORAGE_BUCKET_NAME,
                isbn,
                object_name
            )

def query_books(page, text="", unavailable='true'):
    route = os.path.join(settings.DOMAIN, "api/book/query/?")
    route += f'&pg={page}'
    route += f'&q={text}'
    route += f'&unav={unavailable}'

    try:
        res = requests.get(route).json()
        books = res['data']
        return books
    except Exception as e:
        print(e)
        pass

def upload_book_image_to_s3(url, bucket, isbn, object_name):
    """
    Uploads an image to an s3 bucket.

    Params:
        -- url {string} - http image url
        -- bucket {string} - S3 bucket name
        -- isbn {string} - book isbn
        -- object_name {string} - Object prefix
    """
    s3 = session.client("s3")
    fp = urllib.urlopen(url)
    try:
        response = s3.upload_fileobj(fp, bucket, f"{isbn}/{object_name}")
    except Exception as e:
        raise
    return True

def get_id(url):
    domain = "http://images.amazon.com/images/P/"
    return url.replace(domain, "")
