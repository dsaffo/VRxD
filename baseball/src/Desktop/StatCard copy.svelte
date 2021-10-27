<script>
 import { Col,  Row, Table, Popover} from 'sveltestrap';
 import PrecentileScale from './PercentileScale.svelte';

 export let stats = {};
 export let percentiles = {};
</script>

<div>
    <Row  style="border: 2px solid grey;"> 
        <Col style="border-right: 2px solid grey;" sm=5>
            <Table borderless>
                <tbody>
                  <tr>
                    <td id="pitches">Pitches {stats.pitches}</td>
                    <Popover
                        trigger="hover"
                        placement="bottom"
                        target="pitches">
                        This is a Popover wit h hover as the trigger.
                    </Popover>
                    <td id="era">ERA: {stats.ERA}</td>
                    <Popover
                        trigger="hover"
                        placement="bottom"
                        target="era">
                        This is a Popover wit h hover as the trigger.
                    </Popover>
                    <td id="xera">xERA: {stats.XERA}</td>
                    <Popover
                        trigger="hover"
                        placement="bottom"
                        target="xera">
                        This is a Popover wit h hover as the trigger.
                    </Popover>
                  </tr>

                  <tr>
                    <td id="ip">IP: {stats.IP}</td>
                    <Popover
                        trigger="hover"
                        placement="bottom"
                        target="ip">
                        This is a Popover wit h hover as the trigger.
                    </Popover>
                    <td id="so">SO: {stats.SO}</td>
                    <Popover
                        trigger="hover"
                        placement="bottom"
                        target="so">
                        This is a Popover wit h hover as the trigger.
                    </Popover>
                    <td id="whip">WHIP: {stats.WHIP}</td>
                    <Popover
                        trigger="hover"
                        placement="bottom"
                        target="whip">
                        This is a Popover wit h hover as the trigger.
                    </Popover>
                  </tr>

                  <tr>
                    <td id="bb">Batted Balls: {stats.BB}</td>
                    <Popover
                        trigger="hover"
                        placement="bottom"
                        target="bb">
                        This is a Popover wit h hover as the trigger.
                    </Popover>
                    <td id="barrel">Barrel: {stats.barrel}</td>
                    <Popover
                        trigger="hover"
                        placement="bottom"
                        target="barrel">
                        This is a Popover wit h hover as the trigger.
                    </Popover>
                    <td id="barrelp">Barrel %: {stats.barrelPer}%</td>
                    <Popover
                        trigger="hover"
                        placement="bottom"
                        target="barrelp">
                        This is a Popover wit h hover as the trigger.
                    </Popover>
                  </tr>

                  <tr>
                    <td id="ev">Exit Velocity: {stats.EV}</td>
                    <Popover
                        trigger="hover"
                        placement="bottom"
                        target="ev">
                        This is a Popover wit h hover as the trigger.
                    </Popover>
                    <td id="la">Launch Angle: {stats.LA}</td>
                    <Popover
                        trigger="hover"
                        placement="bottom"
                        target="la">
                        This is a Popover wit h hover as the trigger.
                    </Popover>
                    <td id="SS">Sweet Spot %: {stats.SSP}%</td>
                    <Popover
                        trigger="hover"
                        placement="bottom"
                        target="SS">
                        This is a Popover wit h hover as the trigger.
                    </Popover>
                  </tr>

                  <tr>
                    <td id="xba">XBA: {stats.XBA}</td>
                    <Popover
                        trigger="hover"
                        placement="bottom"
                        target="xba">
                        This is a Popover wit h hover as the trigger.
                    </Popover>
                    <td id="xslg">XSLG: {stats.XSLG}</td>
                    <Popover
                        trigger="hover"
                        placement="bottom"
                        target="xslg">
                        This is a Popover wit h hover as the trigger.
                    </Popover>
                    <td id="woba">WOBA: {stats.WOBA}</td>
                    <Popover
                        trigger="hover"
                        placement="bottom"
                        target="woba">
                        This is a Popover wit h hover as the trigger.
                    </Popover>
                  </tr>

                  <tr>
                    <td id="kp">Strike %: {stats.KP}%</td>
                    <Popover
                        trigger="hover"
                        placement="bottom"
                        target="kp">
                        This is a Popover wit h hover as the trigger.
                    </Popover>
                    <td id="bbp">Batted Ball %: {stats.BBP}%</td>
                    <Popover
                        trigger="hover"
                        placement="bottom"
                        target="bbp">
                        This is a Popover wit h hover as the trigger.
                    </Popover>
                    <td id="hhp">Hard Hit %: {stats.HHP}%</td>
                    <Popover
                        trigger="hover"
                        placement="bottom"
                        target="hhp">
                        This is a Popover wit h hover as the trigger.
                    </Popover>
                  </tr>
                </tbody>
              </Table>
        </Col>
        <Col sm=7>
            <Table borderless>
                <tbody>
                  <tr>
                    <td><PrecentileScale label="xwOBA" percentile={percentiles.xwOBA}></PrecentileScale></td>
                    <td><PrecentileScale label="xBA" percentile={percentiles.xBA}></PrecentileScale></td>
                    <td><PrecentileScale label="xSLG" percentile={percentiles.xSLG}></PrecentileScale></td>
                    <td><PrecentileScale label="xISO" percentile={percentiles.xISO}></PrecentileScale></td>
                  </tr>
                  <tr>
                    <td><PrecentileScale label="xOBP" percentile={percentiles.xOBP}></PrecentileScale></td>
                    <td><PrecentileScale label="Barrel" percentile={percentiles.Brl}></PrecentileScale></td>
                    <td><PrecentileScale label="Barrel %" percentile={percentiles.BrlP}></PrecentileScale></td>
                    <td><PrecentileScale label="Exit Velocity" percentile={percentiles.EV}></PrecentileScale></td>
                    
                  </tr>
                  <tr>
                    <td><PrecentileScale label="Hard Hit %" percentile={percentiles.HHP}></PrecentileScale></td>
                    <td><PrecentileScale label="Strike %" percentile={percentiles.KP}></PrecentileScale></td>
                    <td><PrecentileScale label="Batted Ball %" percentile={percentiles.BBP}></PrecentileScale></td>
                    <td><PrecentileScale label="Whiff %" percentile={percentiles.WP}></PrecentileScale></td>
                  </tr>
                  <tr>
                    <td><PrecentileScale label="xERA" percentile={percentiles.xERA}></PrecentileScale></td>
                    <td><PrecentileScale label="Fast Ball Speed" percentile={percentiles.FB_V}></PrecentileScale></td>
                    <td><PrecentileScale label="Fast Ball Spin" percentile={percentiles.FB_Spin}></PrecentileScale></td>
                    <td><PrecentileScale label="Curve Ball Spin" percentile={percentiles.CB_Spin}></PrecentileScale></td>
                    
                  </tr>
                </tbody>
              </Table>
           
        </Col>
    </Row>
</div>

<style>

    tbody{
        color: white;
        font-size: medium;
    }

    td {
       height: 10px; 
    }
</style>