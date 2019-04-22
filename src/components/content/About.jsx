import React from 'react';

const About = () => {
    return (
        <div className="contentInfoArea">
            <h3  class="pageTitle">About the website</h3>
            <h5>Viewing Options</h5>
                <p>View all topics</p>
                <p>View all articles</p>
                <p>View articles about specific topics</p>
                <p>Sort articles by multiple options</p>
                <p>Read a single article</p>
                <p>Read comments of an article</p>
            <p>---------------</p>
            <h5>Posting Options (requires login)</h5>
                <p>Post new topics</p>
                <p>Post new articles</p>
                <p>Post new comments on specific articles</p>
            <p>---------------</p>
            <h5>Deleting/Modifying Options (requires login)</h5>
                <p>Delete articles created by the logged-in user only</p>
                <p>Delete comments created by the logged-in user only</p>
                <p>Vote on articles</p>
                <p>Vote on comments</p>
            <h4 className="h4title">Created by Nick Dillon</h4>
        </div>
    )
}

export default About;