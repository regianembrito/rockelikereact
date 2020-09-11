import React from 'react';
import axios from 'axios';
import Button from 'reactstrap';

export class Article extends React.Component {

  constructor(props) {
    super(props);
    this.state = { currentCount: 0, IdArticle: 0, ArticleText: '', LikeCount: 0 };
    this.incrementCounter = this.incrementCounter.bind(this);

    debugger;  
    axios.get('http://localhost:55739/Api/Article/ArticleById?id=1')
      .then(response => {
        this.setState({ 
          currentCount: response.data.LikeCount, 
          IdArticle: response.data.IdArticle, 
          ArticleText: response.data.ArticleText, 
          LikeCount: response.data.LikeCount, 
        });
        debugger;  
      })
      .catch(function (error) {  
        console.log(error);  
    });
  }

  incrementCounter() {
    axios.post('http://localhost:55739/Api/Article/1', {
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
      <div className="container-fluid">
        <div><br />{this.state.ArticleText}<br /></div>
        <button type="button" className="btn btn-primary" name="LikeCount" onChange={this.handleChange} onClick={this.incrementCounter}>Like {this.state.currentCount}</button>
      </div>
    );
  }
}
export default Article;