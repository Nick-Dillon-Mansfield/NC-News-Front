import axios from "axios";

const baseURL = 'https://ncnews-api.herokuapp.com/api'

export const fetchTopics = () => {
    return axios.get(`${baseURL}/topics`)
        .then(({ data: {topics} }) => {
            return topics;
        })
}

export const fetchArticles = () => {
    return axios.get(`${baseURL}/articles`)
        .then(({ data: {articles} }) => {
            return articles
        })
}

