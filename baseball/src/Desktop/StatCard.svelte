<script>
 import { Col,  Row, Table, Popover} from 'sveltestrap';
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
                        This is a Popover wit h hover as the trigger.
                    </Popover>
      </Col>

      <Col>
        <h5 id="era">ERA: {stats.ERA}</h5>
        <Popover
            trigger="hover"
            placement="bottom"
            target="era">
            This is a Popover wit h hover as the trigger.
        </Popover>
      </Col>

      <Col>
        <h5 id="xera">xERA: {stats.XERA}</h5>
        <Popover
            trigger="hover"
            placement="bottom"
            target="xera">
            This is a Popover wit h hover as the trigger.
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
                        This is a Popover wit h hover as the trigger.
                    </Popover>
      </Col>

      <Col>
        <h5 id="so">SO: {stats.SO}</h5>
                    <Popover
                        trigger="hover"
                        placement="bottom"
                        target="so">
                        This is a Popover wit h hover as the trigger.
                    </Popover>
      </Col>

      <Col>
        <h5 id="whip">WHIP: {stats.WHIP}</h5>
                    <Popover
                        trigger="hover"
                        placement="bottom"
                        target="whip">
                        This is a Popover wit h hover as the trigger.
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
            This is a Popover wit h hover as the trigger.
        </Popover>
      </Col>

      <Col>
        <h5 id="barrel">Barrel: {stats.barrel}</h5>
                    <Popover
                        trigger="hover"
                        placement="bottom"
                        target="barrel">
                        This is a Popover wit h hover as the trigger.
                    </Popover>
      </Col>

      <Col>
        <h5 id="barrelp">Barrel %: {stats.barrelPer}%</h5>
                    <Popover
                        trigger="hover"
                        placement="bottom"
                        target="barrelp">
                        This is a Popover wit h hover as the trigger.
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
                        This is a Popover wit h hover as the trigger.
                    </Popover>
      </Col>

      <Col>
        <h5 id="bbp">Batted Ball %: {stats.BBP}%</h5>
        <Popover
            trigger="hover"
            placement="bottom"
            target="bbp">
            This is a Popover wit h hover as the trigger.
        </Popover>
      </Col>

      <Col>
        <h5 id="hhp">Hard Hit %: {stats.HHP}%</h5>
                    <Popover
                        trigger="hover"
                        placement="bottom"
                        target="hhp">
                        This is a Popover wit h hover as the trigger.
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
                        This is a Popover wit h hover as the trigger.
                    </Popover>
      </Col>

      <Col>
        <h5 id="xslg">XSLG: {stats.XSLG}</h5>
        <Popover
            trigger="hover"
            placement="bottom"
            target="xslg">
            This is a Popover wit h hover as the trigger.
        </Popover>
      </Col>

      <Col>
        <h5 id="woba">WOBA: {stats.WOBA}</h5>
                    <Popover
                        trigger="hover"
                        placement="bottom"
                        target="woba">
                        This is a Popover wit h hover as the trigger.
                    </Popover>
      </Col>
    </Row>
  </Col>
  <Col style="border: solid grey 2px; border-left: none;">
    <Row style="height: 25%; margin-top:12px">
      <Col><PrecentileScale label="xwOBA" percentile={percentiles.xwOBA}></PrecentileScale></Col>
      <Col><PrecentileScale label="xBA" percentile={percentiles.xBA}></PrecentileScale></Col>
      <Col><PrecentileScale label="xSLG" percentile={percentiles.xSLG}></PrecentileScale></Col>
      <Col><PrecentileScale label="xISO" percentile={percentiles.xISO}></PrecentileScale></Col>
    </Row>
    <Row style="height: 25%">
      <Col><PrecentileScale label="xOBP" percentile={percentiles.xOBP}></PrecentileScale></Col>
      <Col><PrecentileScale label="Barrel" percentile={percentiles.Brl}></PrecentileScale></Col>
      <Col><PrecentileScale label="Barrel %" percentile={percentiles.BrlP}></PrecentileScale></Col>
      <Col><PrecentileScale label="Exit Velocity" percentile={percentiles.EV}></PrecentileScale></Col>
    </Row>
    <Row style="height: 25%">
      <Col><PrecentileScale label="Hard Hit %" percentile={percentiles.HHP}></PrecentileScale></Col>
      <Col><PrecentileScale label="Strike %" percentile={percentiles.KP}></PrecentileScale></Col>
      <Col><PrecentileScale label="Batted Ball %" percentile={percentiles.BBP}></PrecentileScale></Col>
      <Col><PrecentileScale label="Whiff %" percentile={percentiles.WP}></PrecentileScale></Col>
    </Row>
    <Row style="height: 25%">
      <Col><PrecentileScale label="xERA" percentile={percentiles.xERA}></PrecentileScale></Col>
      <Col><PrecentileScale label="Fast Ball Speed" percentile={percentiles.FB_V}></PrecentileScale></Col>
      <Col><PrecentileScale label="Fast Ball Spin" percentile={percentiles.FB_Spin}></PrecentileScale></Col>
      <Col><PrecentileScale label="Curve Ball Spin" percentile={percentiles.CB_Spin}></PrecentileScale></Col>
    </Row>
  </Col>
</Row>

<style>

h5 {
  margin: auto;
  width: 100%;
  padding: 10px;
  font-size: 12px;
}

</style>