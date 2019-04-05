import axios from "axios";

const baseURL = 'https://ncnews-api.herokuapp.com/api'

export const fetchTopics = () => {
    return axios.get(`${baseURL}/topics`)
        .then(({ data: {topics} }) => {
            return topics;
        })
};

export const fetchUsers = () => {
    return axios.get(`${baseURL}/users`)
        .then(({ data: {users} }) => {
            return users;
        })
}

export const fetchComments = (article_id) => {
    return axios.get(`${baseURL}/articles/${article_id}/comments`)
        .then(({data: {comments}}) => {
            return comments;
        })
}

export const fetchSingleArticle = (article_id) => {
    return axios.get(`${baseURL}/articles/${article_id}`)
        .then(({data: { article }}) => {
            return article;
        })
}

export const postComment = (user, body, article_id) => {
    return axios.post(`${baseURL}/articles/${article_id}/comments`, {
        username: user,
        body: body
    })
    .then(({data: {createdComment}}) => {
        return createdComment;
    })
}

export const deletePost = (type, id) => {
    const extraURL = type === "Comment" ? `/comments/${id}` : type === "Article" || type === "Your Article" ? `/articles/${id}` : `/error`
    return axios.delete(`${baseURL}${extraURL}`)
        .then((deleteObj) => {
            return deleteObj
        })
}

export const voteOnPost = (type, id, increment) => {
    const extraURL = type === "Comment" ? `/comments/${id}` : type === "Article" || type === "Your Article" ? `/articles/${id}` : `/error`
        return axios.patch(baseURL + extraURL, {
            inc_votes: increment
        })
        .then(({data: {updatedArticle}}) => {
            return updatedArticle;
        });
};

// export const fetchArticles = (url) => {
//     return axios.get(`${url}`)
//         .then(({data: {articles}}) => {
//             return articles;
//         })
// }


