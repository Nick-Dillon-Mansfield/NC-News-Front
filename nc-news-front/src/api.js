import axios from "axios";

const baseURL = 'https://ncnews-api.herokuapp.com/api'

export const fetchTopics = () => {
    return axios.get(`${baseURL}/topics`)
        .then(({ data: {topics} }) => {
            return topics;
        })
}

export const fetchUsers = () => {
    return axios.get(`${baseURL}/users`)
        .then(({ data: {users} }) => {
            return users;
        })
}

export const postComment = (user, body, article_id) => {
    console.log('about to post')
    console.log(user, body, article_id)
    return axios.post(`${baseURL}/articles/${article_id}/comments`, {
        username: user,
        body: body
    })
    .then(({data: {createdComment}}) => {
        console.log('posted')
        return createdComment;
    })
}

// export const fetchArticles = (url) => {
//     return axios.get(`${url}`)
//         .then(({data: {articles}}) => {
//             return articles;
//         })
// }


