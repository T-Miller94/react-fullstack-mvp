import React, { Component } from 'react'
import LocationCard from './LocationCard'
import PostButton from './PostButton'
import PostContainer from './PostContainer'
import PostPopup from './PostPopup'
import SinglePost from './SinglePost'
import TitleCard from './TitleCard'

export default class Thread extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hasPopup: false,
            postList: null,
            loading: true,
            currentPost: null
        }
    }

componentDidMount() {
    fetch(`${this.props.url}/${this.props.thread}`)
        .then((res) => res.json()) 
        .then((data) => this.setState({postList: data, loading: false}))
}

    render() {
        const openPopup = () => {
            this.setState({hasPopup: true})
        }

        const closePopup = () => {
            this.setState({hasPopup: false})
        }

        const postRefresh = async () => {
            this.setState({loading: true})
            fetch(`${this.props.url}/${this.props.thread}`)
                .then((res) => res.json()) 
                .then((data) => this.setState({postList: data, loading: false}))
        }

        const setCurrentPost = (post) => {
            this.setState({currentPost: post})
        }

        const returnToThread = () => {
            this.setState({currentPost: null})
        }

        if(this.state.loading){
            return <h1>Loading...</h1>
        }

        return (
            this.state.currentPost ?
                <SinglePost
                    thread={this.props.thread}
                    post={this.state.currentPost}
                    returnToThread={returnToThread}
                    goToHome={this.props.goToHome}
                    url={this.props.url}
                    setPost={setCurrentPost}
                    refresh={postRefresh} />
                :
                <div className='thread'>
                    <TitleCard goToHome={this.props.goToHome} />
                    <LocationCard thread={this.props.thread} returnToThread={returnToThread} />
                    <PostButton openPopup={openPopup} />
                    <PostPopup
                        thread={this.props.thread}
                        url={this.props.url}
                        showPopup={this.state.hasPopup}
                        closePopup={closePopup}
                        refresh={postRefresh} />
                    <PostContainer posts={this.state.postList} setPost={setCurrentPost} />
                </div>
            )
        }
}

//todo:
//  style app
//  deploy