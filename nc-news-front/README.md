# NC NEWS By Nick Dillon

## Getting started

To begin, you can view the GitHub repository for the app by following the link: https://github.com/Nick-Dillon/NC-News-Front

If you would like to clone the repo, either download the ZIP file directly from the GitHub page, or use your local terminal to do so (e.g.):

```
git clone https://github.com/Nick-Dillon/NC-News-Front.git
```



## Usage

The app is to be used as a news/forum-based website, similar to Reddit. As users can post articles, comments, vote on posts etc. there is more functionality for people who are logged-in.

### API

To download the API for NC NEWS, i.e. the back-end repository, follow the link: https://github.com/Nick-Dillon/NC-News-API

If you would like to clone the back-end repo, eiether download the ZIP file directly from the GitHub page, or use your local terminal to do so (e.g.):
```
git clone https://github.com/Nick-Dillon/NC-News-API.git

FURTHER INSTRUCTIONS ON HOW TO USE THE BACK-END CAN BE FOUND IN THIS REPOSITORY'S README
```

The program runs on the ncnews-api, hosted on heroku. You can view this with the following link: https://ncnews-api.herokuapp.com/

Furthermore, you can view the specific data for the database with the following endpoints:
```
https://ncnews-api.herokuapp.com/api/topics
https://ncnews-api.herokuapp.com/api/users
https://ncnews-api.herokuapp.com/api/articles

https://ncnews-api.herokuapp.com/api/articles/1/comments (1 being the article_id)