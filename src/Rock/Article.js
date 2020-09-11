import React from 'react';
import axios from 'axios';
import Button from 'reactstrap';

export class Article extends React.Component {

  constructor(props) {
    super(props);
    this.state = { currentCount: 0, ID_ARTICLE: 0, ARTICLE1: '', LIKE_COUNT: 0 };
    this.incrementCounter = this.incrementCounter.bind(this);

    axios.get('http://localhost:55739/Api/Article/ArticleById?id=1')
      .then(response => {
        this.setState({ 
          currentCount: response.data.LIKE_COUNT, 
          ID_ARTICLE: response.data.ID_ARTICLE, 
          ARTICLE1: response.data.ARTICLE1, 
          LIKE_COUNT: response.data.LIKE_COUNT, 
        });
      })
      .catch(function (error) {  
        console.log(error);  
    });
  }

  incrementCounter() {
    axios.post('http://localhost:55739/Api/Article/1', {
      ID_ARTICLE: this.state.ID_ARTICLE, ARTICLE1: this.state.ARTICLE1,
      LIKE_COUNT: this.state.LIKE_COUNT
    })
      .then(json => {
        if (json.data.Status === 'Updated') {
          this.setState({
            currentCount: this.state.currentCount + 1,
            ID_ARTICLE: this.state.ID_ARTICLE,
            ARTICLE1: this.state.ARTICLE1,
            LIKE_COUNT: this.state.LIKE_COUNT + 1
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
        <div><br />{this.state.ARTICLE1}<br /></div>
        <button type="button" className="btn btn-primary" name="LIKE_COUNT" onChange={this.handleChange} onClick={this.incrementCounter}>Like {this.state.currentCount}</button>
      </div>
    );
  }
}
export default Article;