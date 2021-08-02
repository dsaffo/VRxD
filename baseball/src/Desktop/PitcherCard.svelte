<script>
    import { Col, Container, Row } from 'sveltestrap';

    export let pitches = [];
    export let name = "Panda";
    export let image = "https://cdn.vox-cdn.com/thumbor/0kp4viyQjwMYvOMpDMFyegO4TEw=/12x0:4907x3263/920x613/filters:focal(12x0:4907x3263):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/49388585/16071828377_85109fdee4_o.0.0.jpg";
    export let age = 5;
    export let team = "Cool Cats";
    export let hand = "Paws";
    export let games = 100;
    export let wins = 100;
    export let losses = 0;

</script>

<div class="chart">
        <Row  style="height: 40%; border: 2px solid grey;"> 
            <Col sm='4'>
                <img src={image}>
			
			</Col>
			<Col sm='8'>
				
			</Col>
        </Row>

        <Row  style="height: 60%; border: 2px solid grey;"> 
            <Col sm='4'>
			</Col>
			<Col sm='8'>
				
			</Col>
        </Row>
   
</div>


<style>
    .chart, h2, p, img{
        width: 100%;
        height: 100%;
    }
</style>