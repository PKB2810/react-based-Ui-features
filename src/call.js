import React, { Component } from 'react';

const Call = (props) => {
    return (
        <div>
            <button onClick = {props.clickHandler} value="CLick me">
                Click Me to call Parent's handler via me
            </button>
        </div>
            
    )

}

class Main extends React.Component{

    constructor(props){
      
        super(props);
        this.timer=null;
        this.state = {

            count : 0,
            data : [],
            searchedData:[],
            noOfRows :20
        };
        this.divStyle ={
            maxHeight:'200px',
            overflow:'scroll'

        }
        
    }

    componentDidMount(){
          fetch('http://dummy.restapiexample.com/api/v1/employees').then((response) =>{ return response.json()} ).then((data) =>{ console.log(data); this.setState({data :data }); } );
        
      //  this.setState({data :data });

    }
    

    clickHandler = () =>{

            this.setState({
                    count:this.state.count-5

            });
            this.setState({
                count:this.state.count+2

        });
    }
   
    debounce = (e) =>{
            var val =e.target.value
            console.log(val);
       if(this.timer){
           clearTimeout(this.timer );
       }
     this.timer =   setTimeout(()=>{
        if(val.trim("").length == 0){
            this.setState({searchedData : []});

        }else{
            this.setState({searchedData:this.state.data.filter((x) => x.id.startsWith(val))})
        }
            
        } , 500);

    }

    lazyLoad = (e) => {
        console.log(e.target.scrollTop);
        //when reached scrollbar reaches at bottom, load new rows
            if(e.target.scrollHeight - e.target.scrollTop == e.target.clientHeight){
                console.log('scrolled');
               this.setState({noOfRows:this.state.noOfRows+20});
            }

        }
    render(){

        const emp = this.state.searchedData.length==0 ? this.state.data.map((datum ,i) => {
           console.log(this.state.noOfRows);
            if(i < this.state.noOfRows)
                 return <div key={datum.id}> {datum.id}</div>

     }) : this.state.searchedData.map((datum) => {
         return <div key={datum.id}> {datum.id}</div>})

        return(

            <div >
                  {this.state.count}  
                  <Call  clickHandler = {this.clickHandler}/>

                    <input type="text" onChange={(e) => this.debounce(e)}/>

                    <div style={ this.divStyle } onScroll ={(e) => {this.lazyLoad(e)}}>
                        {emp}
                    </div>
            </div>

        )

    }

}

export default Main;