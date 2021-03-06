yc.inner.building.Tower = yc.inner.building.Building.extend({  

	ctor: function(){

		this._super() ;
		
		// 炮弹速度
		this.speed = 300
		
		// 射击频率
		this.freq = 1500
		
		// 伤害
		this.injure = 10
		
		// 射程
		this.range = 100
		
		// 溅射半径
		this.sputtering = 20
		
		// 溅射伤害
		this.sputtering_injure = 3
		
		// 减速效果
		this.retardment = 0 ;
		this.retardment_duration = 0 ;
		
		this.hexgon = null
		
		this.bShoting = true	

		this.color = 'red' ;

		// 开始动画
        // this.initWithSpriteFrameName("artillery_lvl4_tesla_0049.png") ; //第一帧
        // this.runAction(cc.RepeatForever.create( yc.animations.createAction('towers.shooter') ));

       	this.setAnchorPoint(cc.p(0.5,0.2)) ;
	}
	
	
	
	, draw: function(ctx){

		if(!this.hexgon)
		{
			this._super() ;
			return ;
		}

		// 绘制射击范围
		if(g_architecture=='native')
		{
			if( this.hexgon.selected )
			{
				ctx.fillStyle = "rgba(255,255,255,0.2)" ;
				
				ctx.beginPath() ;
				ctx.moveTo(this.range,0) ;
				ctx.arc(0,0, this.range, 0, Math.PI*2 , false) ;
				ctx.closePath()
				
				ctx.fill() ;
			}
		}
		
		this._super(ctx) ;

		return;
	}
	
	, put: function(hexgon){

		this._super(hexgon) ;

		// 开始射击
		this.shot() ;
		
		return yc.inner.building.Tower ;
	}
	
	, shot: function(){

		if(!this.bShoting)
		{
			return ;
		}

		// 瞄准病毒
		var myPos = this.getPosition() ;
		var arrVirus = ins(yc.inner.InnerLayer).layerVirus.getChildren() ;

		for(var i=0;i<arrVirus.length;i++)
		{
			var virus = arrVirus[i]
			var virusPos = virus.getPosition() ;
			var dis = yc.util.pointsDis(myPos.x,myPos.y,virusPos.x,virusPos.y) ;
			
			// bingo !
			if( dis < this.range+virus.radius )
			{
				// shot
				var bullet = yc.inner.building.Bullet.create() ;
				bullet.shot( myPos, virusPos, dis, this ) ;
				this.shotSound();
				break ;
			}
		}
		// next time shot
		this.runAction( yc.actions.Timer.create(this.freq/1000, 1, this, this.shot) ) ;
	}
	, shotSound : function(){
		if(this.sound && !yc.settings.MUTE){
			cc.AudioEngine.getInstance().playEffect("res/sound/"+this.sound);
		}
	}
	
	/**
	 * 建筑停用
	 */
	, stop: function(){
		this.bShoting = false ;
	}
}) ;


// yc.inner.building.Tower.upgraders = [] ;
// yc.inner.building.Tower.block = true ;



/**
 * 射击防御塔
 */
yc.inner.building.TowerShooter = yc.inner.building.Tower.extend({
	ctor: function(){
		this._super() ;
		this.color = 'yellow' ;
		this.sound = 'Attack01.ogg';
		// this.initWithFile("res/tower_yellow.png");

		// 开始动画
        this.initWithSpriteFrame(yc.animations.firstFrame( "towers.factory_gong")) ; //第一帧
        this.runAction(cc.RepeatForever.create( yc.animations.createAction('towers.factory_gong') ));
		
		yc.util.cloneObject(this,yc.settings.building.Shooter.base) ;
	}
}) ;
yc.inner.building.TowerShooter.upgraders = [] ;
yc.inner.building.TowerShooter.block = true ;
// yc.inner.building.TowerShooter.sound = 'Attack01' ;


/**
 * 火炮防御塔
 */
yc.inner.building.TowerCannon = yc.inner.building.Tower.extend({
	ctor: function(){
		this._super() ;
		this.color = 'red' ;
		this.sound = 'Bom01.ogg';

		// 开始动画
        this.initWithSpriteFrame(yc.animations.firstFrame("towers.factory_pao") ); //第一帧
        this.runAction(cc.RepeatForever.create( yc.animations.createAction('towers.factory_pao') ));


		yc.util.cloneObject(this,yc.settings.building.Cannon.base) ;
	}
}) ;
yc.inner.building.TowerCannon.upgraders = [] ;
yc.inner.building.TowerCannon.block = true ;




/**
 * 减速防御塔
 */
yc.inner.building.TowerSlower = yc.inner.building.Tower.extend({
	ctor: function(){
		this._super() ;
		this.color = 'blue' ;
		this.sound = 'Elec01.ogg';
		
		// 开始动画
        this.initWithSpriteFrame(yc.animations.firstFrame( "towers.factory_arcane_tower") ); //第一帧
        this.runAction(cc.RepeatForever.create( yc.animations.createAction('towers.factory_arcane_tower') ));

		yc.util.cloneObject(this,yc.settings.building.Slower.base) ;
	}
}) ;
yc.inner.building.TowerSlower.upgraders = [] ;
yc.inner.building.TowerSlower.block = true ;



/**
 * 喷射防御塔
 */
yc.inner.building.TowerJetter = yc.inner.building.Tower.extend({
	ctor: function(){
		this._super() ;
		this.color = 'orange' ;
		this.sound = 'Fire05.ogg';

		// 开始动画
        this.initWithSpriteFrame(yc.animations.firstFrame("towers.factory_arcane_tower") ); //第一帧
        this.runAction(cc.RepeatForever.create( yc.animations.createAction('towers.factory_arcane_tower') ));

		yc.util.cloneObject(this,yc.settings.building.Jetter.base) ;
	}
}) ;
yc.inner.building.TowerJetter.upgraders = [] ;
yc.inner.building.TowerJetter.block = true ;
