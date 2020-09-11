import React from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';

export class Article extends React.Component {
  
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = { currentCount: 0, IdArticle: 0, ArticleText: '', LikeCount: 0 };
    this.incrementCounter = this.incrementCounter.bind(this);
    this.getArticle = this.getArticle.bind(this);
    this.getArticle();
  }

  componentDidMount() { 
    this._isMounted = true;
  }

  getArticle() {
    axios.get('http://localhost:55739/Api/Article/ArticleById?id=1')
    .then(response => {
      if (this._isMounted) {
        this.setState({
          currentCount: response.data.LikeCount,
          IdArticle: response.data.IdArticle,
          ArticleText: response.data.ArticleText,
          LikeCount: response.data.LikeCount,
        });
      }
      
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  incrementCounter() {
    axios.put('http://localhost:55739/Api/Article/1', {
      IdArticle: this.state.IdArticle, ArticleText: this.state.ArticleText,
      LikeCount: this.state.LikeCount
    })
    .then(json => {
      if (json.data.Status === 'Updated') {
        this.setState({
          currentCount: this.state.currentCount + 1,
          IdArticle: this.state.IdArticle,
          ArticleText: this.state.ArticleText,
          LikeCount: this.state.LikeCount + 1
        });
      }
      else {
        console.log('Data not Saved');
      }
    });
  }
  
  handleChange= (e)=> {  
    this.setState({[e.target.name]:e.target.value});  
  }  

  render() {
    return (
      <div className="container">
        <p><br />{this.state.ArticleText}<br /></p>
        <Button color="primary" name="LikeCount" onChange={this.handleChange} onClick={this.incrementCounter}>Like {this.state.currentCount}</Button>
      </div>
    );
  }

  componentWillUnmount() {
    this._isMounted = false;
 }
}
export default Article;