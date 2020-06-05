""" 
Testing file for 

"""

import requests
import unittest
import json
import random

class TestEndpoints(unittest.TestCase):
    def setUp(self):
        self.n = 0
        self.books = [] 
        self.test_books()
        self.isbn = self.books[random.randrange(self.n)]['isbn']


    def test_books(self):
        url = 'http://localhost:3000/api/book/'
        response = requests.get(url).json()
        if response['success'] == True:
            self.books = response['data']
            self.n = len(self.books)
            print(self.n)
            self.assertTrue(self.n > 0, 'Data from api/books is empty.')
        else:
            self.fail(response['message'])

    def test_isbn(self):
        url = 'http://localhost:3000/api/book/' + self.isbn
        response = requests.get(url).json()
        if response['success'] == True:
            book = response['data']
            self.assertTrue(not book is None, 'Data from api/books is empty.')
        else:
            self.fail(response['message'])

    def test_create(self):
        url = 'http://localhost:3000/api/book/'
        headers = {'content-type': 'application/json'}
        book = { 'isbn': '99999999999',
            'title': 'Principles of Mathematics',
            'author': 'Walter Rudin//',
            'publication_year': 1800,
            'publisher': 'McGrawHill',
            'image_url_s': "wwww.test.com",
            'image_url_m': "wwww.test.com",
            'image_url_l': "wwww.test.com",
            'copies': 1,
            'available': 1 }
        response = requests.post(url, data=json.dumps(book), headers=headers)
        response = response.json()
        if response['success'] == True:
            if response['isbn'] == book['isbn']:
                #print('book_success')
                #print('db_book')
                #print(response)
                pass
            else: 
                self.fail('Data from api/books is empty.')
        else:
            #print('book_failure')
            self.fail(response['message'])

    def test_loan(self):
        isbn = '99999999999'
        url = 'http://localhost:3000/api/book/rent/' + isbn
        book_pre_loan = requests.get('http://localhost:3000/api/book/' + isbn).json()
        response = requests.put(url).json()
        if response['success'] == True:
            #print('Loan succuss')
            book_post_loan = requests.get('http://localhost:3000/api/book/' + isbn).json()
            #print(book_post_loan)
            book_post_loan = book_post_loan['data']

            self.assertEqual(book_pre_loan['available'] - 1, book_post_loan['available'], 'Available does not match expected.')
        else:
            self.fail(response['message'])

    def test_return(self):
        isbn = '99999999999'
        url = 'http://localhost:3000/api/book/return/' + isbn
        book_pre_loan = requests.get('http://localhost:3000/api/book/' + isbn).json()
        response = requests.put(url).json()
        if response['success'] == True:
            #print('Loan succuss')
            book_post_loan = requests.get('http://localhost:3000/api/book/' + isbn).json()['data']
            self.assertEqual(book_pre_loan['available'] + 1, book_post_loan['available'], 'Available does not match expected.')
        else:
            self.fail(response['message'])

    def test_delete(self):
        isbn = '99999999999'
        url = 'http://localhost:3000/api/book/' + isbn
        response = requests.delete(url).json()
        if response['success'] == True:
            print(response)
            pass
        else:
            self.fail(response['message'])





unittest.main()
