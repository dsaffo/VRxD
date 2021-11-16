<script>
import "aframe";

let text = "";
</script>


<a-text id="description" value="{text}" baseline="top" align="center" position="0 -0.65 0" scale="0.45 0.45 0.45" color="black"></a-text>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<a-plane visible="false" class="collidable" id="pitches" height=0.15 width=0.4 position="-1.7 0.45 0.031" 
on:mouseenter="{()=> text = "Total pitches thrown."}"
on:mouseout="{()=> text = ""}"
></a-plane>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<a-plane visible="false" class="collidable" id="era" height=0.15 width=0.4 position="-1.2 0.45 0.031"
on:mouseenter="{()=> text = "Earned run average (ERA) represents the number of earned runs a pitcher allows per nine innings -- with earned runs being any runs that scored without the aid of an error or a passed ball. ERA is the most commonly accepted statistical tool for evaluating pitchers. "}"
on:mouseout="{()=> text = ""}"
></a-plane>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<a-plane visible="false" class="collidable" id="xera" height=0.15 width=0.4 position="-0.7 0.45 0.031"
on:mouseenter="{()=> text = "Expected ERA (xERA) is a simple 1:1 translation of Expected Weighted On-Base Average (xwOBA), converted to the ERA scale. xwOBA takes into account the amount of contact (strikeouts, walks, hit by pitch) and the quality of that contact (exit velocity and launch angle), in an attempt to credit the pitcher or hitter for the moment of contact, not for what might happen to that contact thanks to other factors like ballpark, weather, or defense."}"
on:mouseout="{()=> text = ""}"
></a-plane>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<a-plane visible="false" class="collidable" id="ip" height=0.15 width=0.4 position="-1.7 0.25 0.031"
on:mouseenter="{()=> text = "Innings pitched (IP) measures the number of innings a pitcher remains in a game. Because there are three outs in an inning, each out recorded represents one-third of an inning pitched."}"
on:mouseout="{()=> text = ""}"
></a-plane>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<a-plane visible="false" class="collidable" id="so" height=0.15 width=0.4 position="-1.2 0.25 0.031"
on:mouseenter="{()=> text = "A strikeout (SO) occurs when a pitcher throws any combination of three swinging or looking strikes to a hitter. (A foul ball counts as a strike, but it cannot be the third and final strike of the at-bat. A foul tip, which is caught by the catcher, is considered a third strike.)"}"
on:mouseout="{()=> text = ""}"
></a-plane>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<a-plane visible="false" class="collidable" id="whip" height=0.15 width=0.4 position="-0.7 0.25 0.031"
on:mouseenter="{()=> text = "Walks And Hits Per Inning Pitched (WHIP) is one of the most commonly used statistics for evaluating a pitcher's performance. The statistic shows how well a pitcher has kept runners off the basepaths, one of his main goals."}"
on:mouseout="{()=> text = ""}"
></a-plane>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<a-plane visible="false" class="collidable" id="bb" height=0.15 width=0.4 position="-1.7 0.05 0.031"
on:mouseenter="{()=> text = "Number of times a pitch resulted in a batted ball event (BBE). A BBE represents any batted ball that produces a result. For pitchers, a lower score is better."}"
on:mouseout="{()=> text = ""}"
></a-plane>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<a-plane visible="false" class="collidable" id="barrel" height=0.15 width=0.4 position="-1.2 0.05 0.031"
on:mouseenter="{()=> text = "Number of times a pitch resulted in a barreled hit -- a batted ball with the perfect combination of exit velocity and launch angle. For pitchers, a lower score is better. "}"
on:mouseout="{()=> text = ""}"
></a-plane>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<a-plane visible="false" class="collidable"id="barrelp" height=0.15 width=0.4 position="-0.7 0.05 0.031"
on:mouseenter="{()=> text = "Number of times a pitch resulted in a barreled hit -- a batted ball with the perfect combination of exit velocity and launch angle. For pitchers, a lower score is better."}"
on:mouseout="{()=> text = ""}"
></a-plane>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<a-plane visible="false" class="collidable" id="kp" height=0.15 width=0.4 position="-1.7 -0.20 0.031"
on:mouseenter="{()=> text = "The percentage of pitches that resulted in a called strike. For pitchers, a higher score is better."}"
on:mouseout="{()=> text = ""}"
></a-plane>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<a-plane visible="false" class="collidable" id="bbp" height=0.15 width=0.4 position="-1.2 -0.20 0.031"
on:mouseenter="{()=> text = "The percentage of pitches that resulted in a batted ball event (BBE). A BBE represents any batted ball that produces a result. For pitchers, a lower score is better."}"
on:mouseout="{()=> text = ""}"
></a-plane>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<a-plane visible="false" class="collidable" id="hhp" height=0.15 width=0.4 position="-0.7 -0.20 0.031"
on:mouseenter="{()=> text = "The percentage of pitches that resulted in a hard hit -- one hit with an exit velocity of 95 mph or higher. For pitchers, a lower score is better."}"
on:mouseout="{()=> text = ""}"
></a-plane>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<a-plane visible="false" class="collidable" id="xba" height=0.15 width=0.4 position="-1.7 -0.40 0.031"
on:mouseenter="{()=> text = "Expected Batting Average (xBA) is a metric that measures the likelihood that a batted ball will become a hit (a good result for the batter). For pitchers, a lower score is better."}"
on:mouseout="{()=> text = ""}"
></a-plane>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<a-plane visible="false" class="collidable" id="xslg" height=0.15 width=0.4 position="-1.2 -0.40 0.031"
on:mouseenter="{()=> text = "Expected Slugging Percentage (xSLG) is formulated using exit velocity, launch angle and, on certain types of batted balls, sprint speed. This metric is used to judge the expected quality of batted balls. For pitchers, a lower score is better. "}"
on:mouseout="{()=> text = ""}"
></a-plane>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<a-plane visible="false" class="collidable" id="woba" height=0.15 width=0.4 position="-0.7 -0.40 0.031"
on:mouseenter="{()=> text = "Weighted On-base Average (wOBA)  is a version of on-base percentage that accounts for how a player reached base -- instead of simply considering whether a player reached base. The value for each method of reaching base is determined by how much that event is worth in relation to projected runs scored (example: a double is worth more than a single). For pitchers, a lower score is better."}"
on:mouseout="{()=> text = ""}"
></a-plane>

<!--Percentiles-->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<a-plane visible="false" class="collidable" id="pwoba" height=0.15 width=0.4 position="-0.1 0.45 0.031"
on:mouseenter="{()=> text = " Weighted On-base Average (wOBA)  is a version of on-base percentage that accounts for how a player reached base -- instead of simply considering whether a player reached base. The value for each method of reaching base is determined by how much that event is worth in relation to projected runs scored (example: a double is worth more than a single).For pitchers, higher percentile score is better. "}"
on:mouseout="{()=> text = ""}"
></a-plane>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<a-plane visible="false" class="collidable" id="pxba" height=0.15 width=0.4 position="0.5 0.45 0.031"
on:mouseenter="{()=> text = "Expected Batting Average (xBA) is a Statcast metric that measures the likelihood that a batted ball will become a hit. For pitchers, higher percentile score is better."}"
on:mouseout="{()=> text = ""}"
></a-plane>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<a-plane visible="false" class="collidable" id="pxslg" height=0.15 width=0.4 position="1.1 0.45 0.031"
on:mouseenter="{()=> text = "Expected slugging percentage represents the expected number of bases a player records per at-bat. Unlike on-base percentage, slugging percentage deals only with hits and does not include walks and hit-by-pitches in its equation. For pitchers, higher percentile score is better."}"
on:mouseout="{()=> text = ""}"
></a-plane>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<a-plane visible="false" class="collidable" id="pxiso" height=0.15 width=0.4 position="1.7 0.45 0.031"
on:mouseenter="{()=> text = "Expected isolated power (xISO) is the expected raw power of batters, computed with slugging percentage and batting average. For pitchers, higher percentile score is better."}"
on:mouseout="{()=> text = ""}"
></a-plane>

<!--row2-->

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<a-plane visible="false" class="collidable" id="pxobp" height=0.15 width=0.4 position="-0.1 0.20 0.031"
on:mouseenter="{()=> text = "Expected on base percentage (xOBP) refers to how frequently a batter is expected to reach base per plate appearance. Times on base include hits, walks and hit-by-pitches, but do not include errors, times reached on a fielder's choice or a dropped third strike. (Separately, sacrifice bunts are removed from the equation entirely, because it is rarely a hitter's decision to sacrifice himself, but rather a manager's choice as part of an in-game strategy.) For pitchers, higher percentile score is better."}"
on:mouseout="{()=> text = ""}"
></a-plane>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<a-plane visible="false" class="collidable" id="pbarrel" height=0.15 width=0.4 position="0.5 0.20 0.031"
on:mouseenter="{()=> text = "Number of times a pitch resulted in a barreled hit -- a batted ball with the perfect combination of exit velocity and launch angle. For pitchers, a lower score is better."}"
on:mouseout="{()=> text = ""}"
></a-plane>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<a-plane visible="false" class="collidable" id="pbp" height=0.15 width=0.4 position="1.1 0.20 0.031"
on:mouseenter="{()=> text = "Percentage of pitches that resulted in a barreled hit -- a batted ball with the perfect combination of exit velocity and launch angle. For pitchers, a lower score is better."}"
on:mouseout="{()=> text = ""}"
></a-plane>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<a-plane visible="false" class="collidable" id="pev" height=0.15 width=0.4 position="1.7 0.20 0.031"
on:mouseenter="{()=> text = "Average speed of batted balls. For pitchers, a lower score is better. "}"
on:mouseout="{()=> text = ""}"
></a-plane>

<!--row3-->

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<a-plane visible="false" class="collidable" id="phh" height=0.15 width=0.4 position="-0.1 -0.1 0.031"
on:mouseenter="{()=> text = "Average speed of batted balls. For pitchers, a lower score is better. "}"
on:mouseout="{()=> text = ""}"
></a-plane>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<a-plane visible="false" class="collidable" id="pk" height=0.15 width=0.4 position="0.5 -0.1 0.031"
on:mouseenter="{()=> text = "The percentage of pitches that resulted in a called strike. For pitchers, a higher score is better. "}"
on:mouseout="{()=> text = ""}"
></a-plane>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<a-plane visible="false" class="collidable" id="pbb" height=0.15 width=0.4 position="1.1 -0.1 0.031"
on:mouseenter="{()=> text = "The percentage of pitches that resulted in a batted ball event (BBE). A BBE represents any batted ball that produces a result. For pitchers, a lower score is better. "}"
on:mouseout="{()=> text = ""}"
></a-plane>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<a-plane visible="false" class="collidable" id="pwhiff" height=0.15 width=0.4 position="1.7 -0.1 0.031"
on:mouseenter="{()=> text = "The percentage of pitches that resulted in a swing and miss or swinging strike. For pitchers, a higher score is better."}"
on:mouseout="{()=> text = ""}"
></a-plane>

<!--row4-->

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<a-plane visible="false" class="collidable" id="pxera" height=0.15 width=0.4 position="-0.1 -0.35 0.031"
on:mouseenter="{()=> text = "Expected ERA (xERA) is a simple 1:1 translation of Expected Weighted On-Base Average (xwOBA), converted to the ERA scale. xwOBA takes into account the amount of contact (strikeouts, walks, hit by pitch) and the quality of that contact (exit velocity and launch angle), in an attempt to credit the pitcher or hitter for the moment of contact, not for what might happen to that contact thanks to other factors like ballpark, weather, or defense. For pitchers, a higher score is better. " }"
on:mouseout="{()=> text = ""}"
></a-plane>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<a-plane visible="false" class="collidable" id="pfbs" height=0.15 width=0.4 position="0.5 -0.35 0.031"
on:mouseenter="{()=> text = "Average speed of fastballs thrown. For pitchers, a higher score is better. "}"
on:mouseout="{()=> text = ""}"
></a-plane>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<a-plane visible="false" class="collidable" id="pfbss" height=0.15 width=0.4 position="1.1 -0.35 0.031"
on:mouseenter="{()=> text = "Average spin rate of fastballs thrown. For pitchers, a higher score is better."}"
on:mouseout="{()=> text = ""}"
></a-plane>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<a-plane visible="false" class="collidable" id="pcbs" height=0.15 width=0.4 position="1.7 -0.35 0.031"
on:mouseenter="{()=> text = "Average spin rate of curveballs thrown. For pitchers, a higher score is better."}"
on:mouseout="{()=> text = ""}"
></a-plane>


