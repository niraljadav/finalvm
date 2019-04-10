import React, { Component } from 'react'
import { connect } from "react-redux"
import PropTypes from "prop-types"
import Post from "./Post"
import { getPosts } from "../../actions/postActions"
import Spinner from "../common/Spinner"


class JournalPosts extends Component {
    componentDidMount() {
        this.props.getPosts()
    }
    render() {
        const { posts, loading } = this.props.post;
        let postContent

        let postComponents = posts.map(post => <Post 
            key={post._id} 
            title={post.title} 
            content={post.content} 
            date={post.post_date}
            id={post._id} />)

        if (posts === null || loading) {
            postContent = <Spinner />
        } else {
            postContent = (
                <div>
                    {postComponents}
                </div>
            )
        }
        return (
            <div>
                {postContent}
            </div>
        )
    }
}

JournalPosts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, { getPosts })(JournalPosts)