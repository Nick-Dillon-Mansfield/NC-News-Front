/*

--------------
Error Handling
--------------

There are a few errors that could appear in our front end. IF a user tried to go to /articles/2139402351, that article doesn't exist, so the user would get a big red screen saying 'unhandled rejection, blah blah blah...'.

We can use .catch(err => { }) syntax after our axios requests to find out what went wrong:

    export const fetchArticlesByID = async article_id => {
        const {data, status} = await axios    
            .get(`${url}/${article_id}`)  
            .catch(err => err.response)
        if (data.article) return data.article
        else throw {
            msg: data.msg,
            status
        }
    }

1. data and status are created once the axios request is done.
2. if data.article exists, the function will return the article (when given a valid article_id)
3. if data.article doesn't exist, it will throw an error to the next error handler:

    componentDidMont() {
        fetchArticleByID(article_id)
        .then(article => {
            this.setState({ article })
        })
        .catch(err => {
            this.setState({ articleError: err })
        })
    }

-------------------
Make a new error function component:
    const errorer = ({error}) => {
        return <div>
            <h4>{error.status}</h4>
            <p>{error.msg}</p>
        </div>
    }





---------------------
REQUIRED INPUT
---------------------
IN TEXT BOXES, WE CAN INCLUDE THE 'required' PROP (similar to the disabled prop for buttons) WHICH MEANS IT WILL DISPLAY A MESSAGE ON HOVER SAYING THAT THIS FIELD IS REQUIRED.



    */