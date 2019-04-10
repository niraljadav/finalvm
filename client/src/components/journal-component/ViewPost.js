import React, { Component } from 'react'
import { getPost, deletePost } from "../../actions/postActions"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import moment from "moment"
import { Link, withRouter } from "react-router-dom"
import Spinner from "../common/Spinner"

class ViewPost extends Component {
    constructor() {
        super()
        this.handleDelete = this.handleDelete.bind(this)
    }
    componentDidMount() {
        this.props.getPost(this.props.match.params.post_id)
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.post.post === null && this.props.post.loading) {
            this.props.history.push('/not-found');
          }
    }
    handleDelete() {
        this.props.deletePost(this.props.post.post._id, this.props.history)
    }

    render() {

        const { post, loading } = this.props.post
        let postContent

        if (post === null || loading || Object.keys(post).length === 0) {
            postContent = (
                <Spinner />
            )
        } else {
            postContent = (
                <div className="view container-fluid text-center">
                    <h2 className="m-0">{post.title}</h2>
                    <p className="text-muted p-0">{moment(post.post_date).format("DD MMMM YYYY")}</p>
                    <div className="content">
                        <p>{post.content}</p>
                    </div>
                    <div className="row justify-content-around mt-4">
                        <Link to={"/journal/edit/" + post._id} className="btn btn-dark mr-2">Change</Link>
                        <button onClick={this.handleDelete} className="btn btn-secondaryr">Delete</button>
                    </div>
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

ViewPost.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { getPost, deletePost })(withRouter(ViewPost))