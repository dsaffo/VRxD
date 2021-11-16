<script>
 import { Col,  Row, Popover} from 'sveltestrap';
 import PrecentileScale from './PercentileScale.svelte';

 export let stats = {};
 export let percentiles = {};

</script>

<Row style="height: 100%"> 
  <Col sm="5" style="border: solid grey 2px;">
    <Row style="height: 20%">
      <Col>
        <h5 id="pitches">Pitches {stats.pitches}</h5>
        <Popover
            trigger="hover"
            placement="bottom"
            target="pitches">
            Total pitches thrown.
        </Popover>
      </Col>

      <Col>
        <h5 id="era">ERA: {stats.ERA}</h5>
        <Popover
            trigger="hover"
            placement="bottom"
            target="era">
            Earned run average (ERA) represents the number of earned runs a pitcher allows per nine innings 
            -- with earned runs being any runs that scored without the aid of an error or a passed ball. 
            ERA is the most commonly accepted statistical tool for evaluating pitchers. 
        </Popover>
      </Col>

      <Col>
        <h5 id="xera">xERA: {stats.XERA}</h5>
        <Popover
            trigger="hover"
            placement="bottom"
            target="xera">
            Expected ERA (xERA) is a simple 1:1 translation of Expected Weighted On-Base Average (xwOBA), 
            converted to the ERA scale. xwOBA takes into account the amount of contact (strikeouts, walks, hit by pitch) 
            and the quality of that contact (exit velocity and launch angle), in an attempt to credit the pitcher or hitter 
            for the moment of contact, not for what might happen to that contact thanks to other factors like ballpark, weather, or defense.
        </Popover>
      </Col>
    </Row>

    <Row style="height: 20%">
      <Col>
        <h5 id="ip">IP: {stats.IP}</h5>
        <Popover
            trigger="hover"
            placement="bottom"
            target="ip">
            Innings pitched (IP) measures the number of innings a pitcher remains in a game. 
            Because there are three outs in an inning, each out recorded represents one-third of an inning pitched.
        </Popover>
      </Col>

      <Col>
        <h5 id="so">SO: {stats.SO}</h5>
        <Popover
            trigger="hover"
            placement="bottom"
            target="so">
            A strikeout (SO) occurs when a pitcher throws any combination of three swinging or looking strikes to a hitter. 
            (A foul ball counts as a strike, but it cannot be the third and final strike of the at-bat. A foul tip, 
            which is caught by the catcher, is considered a third strike.)
        </Popover>
      </Col>

      <Col>
        <h5 id="whip">WHIP: {stats.WHIP}</h5>
        <Popover
            trigger="hover"
            placement="bottom"
            target="whip">
            Walks And Hits Per Inning Pitched (WHIP) is one of the most commonly used statistics for evaluating a pitcher's performance. 
            The statistic shows how well a pitcher has kept runners off the basepaths, one of his main goals. 
        </Popover>
      </Col>
    </Row>

    <Row style="height: 20%">
      <Col>
        <h5 id="bb">Batted Balls: {stats.BB}</h5>
        <Popover
            trigger="hover"
            placement="bottom"
            target="bb">
            Number of times a pitch resulted in a batted ball event (BBE). A BBE represents any batted ball that produces a result. 
            For pitchers, a lower score is better. 
        </Popover>
      </Col>

      <Col>
        <h5 id="barrel">Barrel: {stats.barrel}</h5>
        <Popover
            trigger="hover"
            placement="bottom"
            target="barrel">
            Number of times a pitch resulted in a barreled hit -- a batted ball with the perfect combination of exit velocity and launch angle. 
            For pitchers, a lower score is better. 
        </Popover>
      </Col>

      <Col>
        <h5 id="barrelp">Barrel %: {stats.barrelPer}%</h5>
        <Popover
            trigger="hover"
            placement="bottom"
            target="barrelp">
            The percentage of pitches that resulted in a barreled hit -- a batted ball with the perfect combination of exit velocity and launch angle. 
            For pitchers, a lower score is better. 
        </Popover>
      </Col>
    </Row>

    <Row style="height: 20%">
      <Col>
        <h5 id="kp">Strike %: {stats.KP}%</h5>
        <Popover
            trigger="hover"
            placement="bottom"
            target="kp">
            The percentage of pitches that resulted in a called strike. 
            For pitchers, a higher score is better. 
        </Popover>
      </Col>

      <Col>
        <h5 id="bbp">Batted Ball %: {stats.BBP}%</h5>
        <Popover
            trigger="hover"
            placement="bottom"
            target="bbp">
            The percentage of pitches that resulted in a batted ball event (BBE). A BBE represents any batted ball that produces a result. 
            For pitchers, a lower score is better. 
        </Popover>
      </Col>

      <Col>
        <h5 id="hhp">Hard Hit %: {stats.HHP}%</h5>
        <Popover
            trigger="hover"
            placement="bottom"
            target="hhp">
            The percentage of pitches that resulted in a hard hit -- one hit with an exit velocity of 95 mph or higher. 
            For pitchers, a lower score is better. 
        </Popover>
      </Col>
    </Row>
    <Row style="height: 20%">
      <Col>
        <h5 id="xba">XBA: {stats.XBA}</h5>
        <Popover
            trigger="hover"
            placement="bottom"
            target="xba">
            Expected Batting Average (xBA) is a metric that measures the likelihood that a batted ball will become a hit (a good result for the batter). 
            For pitchers, a lower score is better. 
        </Popover>
      </Col>

      <Col>
        <h5 id="xslg">XSLG: {stats.XSLG}</h5>
        <Popover
            trigger="hover"
            placement="bottom"
            target="xslg">
            Expected Slugging Percentage (xSLG) is formulated using exit velocity, launch angle and, on certain types of batted balls, sprint speed. This 
            metric is used to judge the expected quality of batted balls. For pitchers, a lower score is better. 
        </Popover>
      </Col>

      <Col>
        <h5 id="woba">WOBA: {stats.WOBA}</h5>
        <Popover
            trigger="hover"
            placement="bottom"
            target="woba">
            Weighted On-base Average (wOBA)  is a version of on-base percentage that accounts for how a player reached base -- 
            instead of simply considering whether a player reached base. The value for each method of reaching base is determined 
            by how much that event is worth in relation to projected runs scored (example: a double is worth more than a single).
            For pitchers, a lower score is better. 
        </Popover>
      </Col>
    </Row>
  </Col>


  <Col style="border: solid grey 2px; border-left: none;">
    <Row style="height: 25%; margin-top:12px">
      <Col>
        <div id="pwoba">
          <PrecentileScale label="xwOBA" percentile={percentiles.xwOBA}></PrecentileScale>
        </div>
        <Popover
          trigger="hover"
          placement="bottom"
          target="pwoba">
          Weighted On-base Average (wOBA)  is a version of on-base percentage that accounts for how a player reached base -- 
          instead of simply considering whether a player reached base. The value for each method of reaching base is determined 
          by how much that event is worth in relation to projected runs scored (example: a double is worth more than a single).
          For pitchers, higher percentile score is better. 
        </Popover>
      </Col>

      <Col>
        <div  id="pxba">
          <PrecentileScale label="xBA" percentile={percentiles.xBA}></PrecentileScale>
        </div>
        <Popover
          trigger="hover"
          placement="bottom"
          target="pxba">
          Expected Batting Average (xBA) is a Statcast metric that measures the likelihood that a batted ball will become a hit.
          For pitchers, higher percentile score is better.
        </Popover>
      </Col>
      <Col>
        <div  id="pxslg">
          <PrecentileScale label="xSLG" percentile={percentiles.xSLG}></PrecentileScale>
        </div>
        <Popover
          trigger="hover"
          placement="bottom"
          target="pxslg">
          Expected slugging percentage represents the expected number of bases a player records per at-bat. Unlike on-base percentage, slugging percentage deals only with hits and does not include walks and hit-by-pitches in its equation.
          For pitchers, higher percentile score is better.
        </Popover>
      </Col>
      <Col>
        <div  id="pxiso">
          <PrecentileScale label="xISO" percentile={percentiles.xISO}></PrecentileScale>
        </div>
        <Popover
        trigger="hover"
        placement="bottom"
        target="pxiso">
        Expected isolated power (xISO) is the expected raw power of batters, computed with slugging percentage and batting average.
        For pitchers, higher percentile score is better.
      </Popover>
      </Col>
    </Row>
    <Row style="height: 25%">
      <Col>
        <div  id="pxobp">
          <PrecentileScale label="xOBP" percentile={percentiles.xOBP}></PrecentileScale>
        </div>
        <Popover
        trigger="hover"
        placement="bottom"
        target="pxobp">
        Expected on base percentage (xOBP) refers to how frequently a batter is expected to reach base per plate appearance. Times on base include hits, walks and hit-by-pitches, but do not include errors, times reached on a fielder's choice or a dropped third strike. (Separately, sacrifice bunts are removed from the equation entirely, because it is rarely a hitter's decision to sacrifice himself, but rather a manager's choice as part of an in-game strategy.)
        For pitchers, higher percentile score is better.
      </Popover>
      </Col>
      <Col>
        <div  id="pb">
        <PrecentileScale label="Barrel" percentile={percentiles.Brl}></PrecentileScale>
      </div>
      <Popover
        trigger="hover"
        placement="bottom"
        target="pb">
        Number of times a pitch resulted in a barreled hit -- a batted ball with the perfect combination of exit velocity and launch angle. 
        For pitchers, a lower score is better. 
      </Popover>
    </Col>
      <Col>
        <div id="pbp">
          <PrecentileScale label="Barrel %" percentile={percentiles.BrlP}></PrecentileScale>
        </div>
        <Popover
        trigger="hover"
        placement="bottom"
        target="pbp">
        Percentage of pitches that resulted in a barreled hit -- a batted ball with the perfect combination of exit velocity and launch angle. 
        For pitchers, a lower score is better. 
      </Popover>
      </Col>
      <Col>
        <div id="pev">
          <PrecentileScale label="Exit Velocity" percentile={percentiles.EV}></PrecentileScale>
        </div>
        <Popover
        trigger="hover"
        placement="bottom"
        target="pev">
        Average speed of batted balls.  
        For pitchers, a lower score is better. 
      </Popover>
      </Col>
    </Row>
    <Row style="height: 25%">
      <Col>
        <div id="phh">
          <PrecentileScale label="Hard Hit %" percentile={percentiles.HHP}></PrecentileScale>
        </div>
        <Popover
        trigger="hover"
        placement="bottom"
        target="phh">
        Average speed of batted balls.  
        For pitchers, a lower score is better.  
      </Popover>
      </Col>
      <Col>
        <div id="pk">
          <PrecentileScale label="Strike %" percentile={percentiles.KP}></PrecentileScale>
        </div>
        <Popover
        trigger="hover"
        placement="bottom"
        target="pk">    
        The percentage of pitches that resulted in a called strike. 
        For pitchers, a higher score is better. 
      </Popover>
      </Col>
      <Col>
        <div id="pbb">
          <PrecentileScale label="Batted Ball %" percentile={percentiles.BBP}></PrecentileScale>
        </div>
        <Popover
        trigger="hover"
        placement="bottom"
        target="pbb">    
        The percentage of pitches that resulted in a batted ball event (BBE). A BBE represents any batted ball that produces a result. 
        For pitchers, a lower score is better. 
      </Popover>
      </Col>
      <Col>
        <div id="pwhiff">
          <PrecentileScale label="Whiff %" percentile={percentiles.WP}></PrecentileScale>
        </div>
        <Popover
        trigger="hover"
        placement="bottom"
        target="pwhiff">    
        The percentage of pitches that resulted in a swing and miss or swinging strike.  
        For pitchers, a higher score is better. 
      </Popover>
      </Col>
    </Row>
    <Row style="height: 25%">
      <Col>
        <div id="pxera">
          <PrecentileScale label="xERA" percentile={percentiles.xERA}></PrecentileScale>
        </div>
        <Popover
        trigger="hover"
        placement="bottom"
        target="pxera">    
        Expected ERA (xERA) is a simple 1:1 translation of Expected Weighted On-Base Average (xwOBA), 
        converted to the ERA scale. xwOBA takes into account the amount of contact (strikeouts, walks, hit by pitch) 
        and the quality of that contact (exit velocity and launch angle), in an attempt to credit the pitcher or hitter 
        for the moment of contact, not for what might happen to that contact thanks to other factors like ballpark, weather, or defense.
        For pitchers, a higher score is better. 
      </Popover>
      </Col>
      <Col>
        <div id="pfbs">
          <PrecentileScale label="Fast Ball Speed" percentile={percentiles.FB_V}></PrecentileScale>
        </div>
        <Popover
        trigger="hover"
        placement="bottom"
        target="pfbs">    
        Average speed of fastballs thrown. 
        For pitchers, a higher score is better. 
      </Popover>
      </Col>
      <Col>
        <div id="pfbss">
          <PrecentileScale label="Fast Ball Spin" percentile={percentiles.FB_Spin}></PrecentileScale>
        </div>
        <Popover
        trigger="hover"
        placement="bottom"
        target="pfbss">    
        Average spin rate of fastballs thrown.   
        For pitchers, a higher score is better. 
      </Popover>
      </Col>
      <Col>
        <div id="pcbs">
          <PrecentileScale label="Curve Ball Spin" percentile={percentiles.CB_Spin}></PrecentileScale>
        </div>
        <Popover
        trigger="hover"
        placement="bottom"
        target="pcbs">    
        Average spin rate of curveballs thrown.   
        For pitchers, a higher score is better. 
      </Popover>
      </Col>
    </Row>
  </Col>
</Row>

<style>

h5 {
  margin: auto;
  width: 100%;
  padding: 10px;
  font-size: medium;
}


</style>