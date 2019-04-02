import axios from "axios";

const baseURL = 'https://ncnews-api.herokuapp.com/api'

export const fetchTopics = () => {
    return axios.get(`${baseURL}/topics`)
        .then(({ data: {topics} }) => {
            return topics;
        })
}

// export const fetchArticles = (url) => {
//     return axios.get(`${url}`)
//         .then(({data: {articles}}) => {
//             return articles;
//         })
// }


