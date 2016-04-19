var AppRender= React.createClass({
  getInitialState: function() {
        return {
            searchKey: '',
            result: [],
            isDeleted: false,
            toAdd: false
        }
    }, 
   addDeleteIcons: function() {
        if(this.state.result.length>1){
        this.setState({ isDeleted: true});
    }
    },

    searchQuery: function() {
        let compareValues=['quotationStart','quotationEnd','alternateQuotationStart','alternateQuotationEnd']
     let searchInput= document.getElementById("inputQuery").value;
         for(var i=0;i<compareValues.length;i++){
        if(searchInput == compareValues[i] ){
          this.setState({searchKey: searchInput}, function(){
              dataService.findByName(this.state.searchKey).done(function(result) {
              this.setState({result: result});
          }.bind(this));  
          });
        }else{
            this.setState({result: []});
        }
}   
    },

   DeleteItem: function(item) {
      dataService.deleteCol(item).done(function(result) {
            this.setState({result: result});
        }.bind(this)); 
      this.setState({ isDelete: false});

   },
   showmodal: function(item) {
if(this.state.result.length>1){
   this.setState({ toAdd: true});
}

},
clearSearch:function(){
 document.getElementById("inputQuery").value="";
 this.setState({result: []});
},
getContent: function(){
   let self = this;
  let len= this.state.result.length;
    const {isDeleted, toAdd} = this.state;       

  return(
    <div>
    <div className="row btmborder">
      <div className="col-sm-8">
      <div className="col-sm-8"> 
      <span className="clear-input"><i className="fa fa-times" onClick={this.clearSearch}></i> </span>  
      <input type="search" className='col-sm-2 form-control' id="inputQuery" onChange={this.searchQuery} />
      </div>
      
        </div>
        <div className='col-sm-2'>
        <div className='col-sm-6'><button className="btn btn-primary" onClick={this.showmodal}> Add Item</button></div>
        <div className='col-sm-6'> <button className="btn btn-primary" onClick={this.addDeleteIcons}> Delete Item</button></div>
        </div>
      </div>  
        <div className="row">
            <ul className="col-sm-12 topmargin">
            {

        this.state.result.map(function(item, $index) {
          return <li className='list-item col-sm-2'>
        {
            
            isDeleted ?
            <span className="glipIcon"><i className="fa fa-times" onClick={self.DeleteItem.bind(self,item)}></i> </span>
            : null
        }
          {item.Language} = <q> &nbsp; {item.name} &nbsp;</q>
          

          </li>
           })
          }
      </ul>
      </div>
      {
        toAdd ?
     
        <div className="modal-Box">
      Language: <input type="text" id="addLanguage" />
      Name: <input type="text" id="addName" />
       <button  className="btn btn-success" onClick={this.addItem}> Submit </button>
        <button  className="btn btn-default" onClick={this.cancel}> cancel </button>
       </div>

       :null
      }
      </div>
      );
    },
   addItem: function() {

   let Language= document.getElementById("addLanguage").value;
   let Name= document.getElementById("addName").value;
   if(Language && Language){
    let item= {Language:Language, name:Name};
    dataService.addItem(item).done(function(response) {
            this.setState({result: response});
        }.bind(this)); 
    this.setState({ toAdd: false});
   }
   },

cancel:function(){

 this.setState({ toAdd: false});
}
,
    render: function(){
    let content= this.getContent();
        return(
            <div className="container">
            <div className="row">
            <h2> Search data Using Delimiters </h2>
              </div>
             {content}
      
        </div> 
         );

    }
});

var App = React.createClass({  
    render: function() {  
        return <AppRender />

    }
});

React.render(<App/>, document.getElementById('result'));