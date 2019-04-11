import React from 'react';

const About = () => {
    return (
        <div>
            <h3  class="pageTitle">About the website</h3>
            <h5>Viewing Options</h5>
            <ul>
                <li>View all topics</li>
                <li>View all articles</li>
                <li>View articles about specific topics</li>
                <li>Sort articles by multiple options</li>
                <li>Read a single article</li>
                <li>Read comments of an article</li>
            </ul>
            <p>---------------</p>
            <h5>Posting Options (requires login)</h5>
            <ul>
                <li>Post new topics</li>
                <li>Post new articles</li>
                <li>Post new comments on specific articles</li>
            </ul>
            <p>---------------</p>
            <h5>Deleting/Modifying Options (requires login)</h5>
            <ul>
                <li>Delete articles created by the logged-in user only</li>
                <li>Delete comments created by the logged-in user only</li>
                <li>Vote on articles</li>
                <li>Vote on comments</li>
            </ul>
            <h4 className="h4title">Created by Nick Dillon</h4>
        </div>
    )
}

export default About;