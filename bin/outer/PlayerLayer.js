yc.outer.PlayerLayer = cc.Layer.extend({  
      
    init:function  () {  
        this.setKeypadEnabled(true);  
        this.setTouchEnabled(true);
        
        // 细胞
        this.cell = new yc.outer.Cell() ;
        this.addChild(this.cell) ;
        this.cell.init() ;
        
        // 测试坐标
        var cell2 = new yc.outer.Cell() ;
        this.addChild(cell2) ;
        cell2.setPosition(cc.p(100,100)) ;
        cell2.x = 100 ;
        cell2.y = 100 ;
        
    }  
    
    , keyUp:function (key) {
        switch(key)
        {
        	// left
        	case 37 :
        		this.cell.stopTurn('left') ;
        		break;
        	
        	// up
        	case 38 :
        		this.cell.stopRun() ;
        		break;
        		
        	// right
        	case 39 :
        		this.cell.stopTurn('right') ;
        		break;
        }
    }
    
    , keyDown:function (key) { 
    	//log(key) ;
        switch(key)
        {
        	// left
        	case 37 :
        		this.cell.turn('left') ;
        		break;
        	
        	// up
        	case 38 :
        		this.cell.run() ;
        		break;
        		
        	// right
        	case 39 :
        		this.cell.turn('right') ;
        		break;
        }
    }
});