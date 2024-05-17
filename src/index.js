import * as d3 from "d3";
import data from "../data/ProjetVisualDon.json";
import { lastSlide } from "../graphique_top3Musique/script";

document.addEventListener("DOMContentLoaded", () => {
    fillTitles();

    let controller = new ScrollMagic.Controller();
    let first = -100 / 13;
    let firsst = first.toFixed(2);
    console.log(firsst * 2 + "%");

    let wipeAnimation = new TimelineMax()
        // Animate to second panel
        .to("#slideContainer", 0.5, { z: -150 }) // move back in 3D space
        .to("#slideContainer", 1, { x: firsst + '%' }) // move in to first panel
        .to("#slideContainer", 0.5, { z: 0 }) // move back to origin in 3D space

        .to("#slideContainer", 0.5, { z: -150, delay: 1 })
        .to("#slideContainer", 1, { x: firsst * 2 + '%' })
        .to("#slideContainer", 0.5, { z: 0 })

        .to("#slideContainer", 0.5, { z: -150, delay: 1 })
        .to("#slideContainer", 1, { x: firsst * 3 + '%' })
        .to("#slideContainer", 0.5, { z: 0 })

        .to("#slideContainer", 0.5, { z: -150, delay: 1 })
        .to("#slideContainer", 1, { x: firsst * 4 + '%' })
        .to("#slideContainer", 0.5, { z: 0 })

        .to("#slideContainer", 0.5, { z: -150, delay: 1 })
        .to("#slideContainer", 1, { x: firsst * 5 + '%' })
        .to("#slideContainer", 0.5, { z: 0 })

        .to("#slideContainer", 0.5, { z: -150, delay: 1 })
        .to("#slideContainer", 1, { x: firsst * 6 + '%' })
        .to("#slideContainer", 0.5, { z: 0 })

        .to("#slideContainer", 0.5, { z: -150, delay: 1 })
        .to("#slideContainer", 1, { x: firsst * 7 + '%' })
        .to("#slideContainer", 0.5, { z: 0 })

        .to("#slideContainer", 0.5, { z: -150, delay: 1 })
        .to("#slideContainer", 1, { x: firsst * 8 + '%' })
        .to("#slideContainer", 0.5, { z: 0 })

        .to("#slideContainer", 0.5, { z: -150, delay: 1 })
        .to("#slideContainer", 1, { x: firsst * 9 + '%' })
        .to("#slideContainer", 0.5, { z: 0 })

        .to("#slideContainer", 0.5, { z: -150, delay: 1 })
        .to("#slideContainer", 1, { x: firsst * 10 + '%' })
        .to("#slideContainer", 0.5, { z: 0 })

        .to("#slideContainer", 0.5, { z: -150, delay: 1 })
        .to("#slideContainer", 1, { x: firsst * 11 + '%' })
        .to("#slideContainer", 0.5, { z: 0 })

        .to("#slideContainer", 0.5, { z: -150, delay: 1 })
        .to("#slideContainer", 1, { x: firsst * 12 + '%' })
        .to("#slideContainer", 0.5, { z: 0 })

        .to("#slideContainer", 0.5, { z: -150, delay: 1 })
        .to("#slideContainer", 1, { x: firsst * 13 + '%' })
        .to("#slideContainer", 0.5, { z: 0 })

    new ScrollMagic.Scene({
        triggerElement: "#pinContenaire",
        triggerHook: "onLeave",
        duration: "1300%"
    })
        .setPin("#pinContenaire")
        .setTween(wipeAnimation)
        .addIndicators()
        .addTo(controller);

    let grouped = false;
    const duration = 500;
    const width = 1000;
    const height = 500;
    const barPadding = 5;
    const padding = 40;
    let youtubeColor = "#FF0000";
    let spotifyColor = "#1DB954";

    const dataset = data.map(d => ({
        NomDuTitre: d.NomDuTitre,
        YouTube: d.YouTube,
        Spotify: d.Spotify
    }));

    const svg = d3.select(".monSVG .svg-container")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "svg-container");

    const xScale = d3.scaleBand()
        .domain(data.map(d => d.NomDuTitre))
        .range([padding, width - padding])
        .paddingInner(0.1);

    data.forEach(d => {
        d.TotalViews = d.YouTube + d.Spotify;
    });

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.TotalViews)])
        .range([height - padding, padding]);

    let xAxis = d3.axisBottom(xScale);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height - padding) + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "middle")
        .attr("dy", "1em");

    svg.selectAll(".youtube-bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "youtube-bar")
        .attr("x", d => xScale(d.NomDuTitre))
        .attr("y", d => yScale(d.YouTube))
        .attr("width", xScale.bandwidth() / 2)
        .attr("height", d => height - padding - yScale(d.YouTube))
        .attr("rx", 5)
        .attr("ry", 5)
        .attr("fill", youtubeColor);

    svg.selectAll(".spotify-bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "spotify-bar")
        .attr("x", d => xScale(d.NomDuTitre) + xScale.bandwidth() / 2)
        .attr("y", d => yScale(d.Spotify))
        .attr("width", xScale.bandwidth() / 2)
        .attr("height", d => height - padding - yScale(d.Spotify))
        .attr("rx", 5)
        .attr("ry", 5)
        .attr("fill", spotifyColor);

    var transitionGrouped = function () {
        svg.selectAll(".spotify-bar")
            .transition()
            .duration(duration * 2)
            .attr("width", xScale.bandwidth() / 2)
            .attr("x", d => xScale(d.NomDuTitre) + xScale.bandwidth() / 2)
            .duration(duration * 2)
            .transition()
            .attr("height", d => height - padding - yScale(d.Spotify))
            .duration(duration * 2)
            .attr("y", d => yScale(d.Spotify))
            .attr("fill", spotifyColor);

        svg.selectAll(".youtube-bar")
            .transition()
            .duration(duration)
            .attr("width", xScale.bandwidth() / 2);
    };

    var transitionStacked = function () {
        svg.selectAll(".spotify-bar")
            .transition()
            .duration(duration * 2)
            .attr("y", d => yScale(d.Spotify + d.YouTube))
            .duration(duration * 2)
            .transition()
            .attr("x", d => xScale(d.NomDuTitre))
            .attr("height", d => height - padding - yScale(d.Spotify))
            .duration(duration * 2)
            .attr("width", xScale.bandwidth())
            .attr("fill", spotifyColor);

        svg.selectAll(".youtube-bar")
            .transition()
            .duration(duration * 4)
            .attr("width", xScale.bandwidth());
    };

    d3.selectAll("input[name='mode']").on("change", function () {
        if (this.value === "empile") {
            grouped = false;
            transitionStacked();
        } else {
            grouped = true;
            transitionGrouped();
        }
    });

    svg.selectAll("rect")
        .on("mouseover", function (event, d) {
            if (grouped) {
                d.totalViews = d.YouTube + d.Spotify;
            }

            let tooltipText = "";
            if (d3.select(this).classed("youtube-bar")) {
                tooltipText = "Nom de la musique : " + d.NomDuTitre + "<br/>" + "Artiste : " + d.NomDeArtiste + "<br/>" + "Vues YouTube : " + d.YouTube;
            } else if (d3.select(this).classed("spotify-bar")) {
                tooltipText = "Nom de la musique : " + d.NomDuTitre + "<br/>" + "Artiste : " + d.NomDeArtiste + "<br/>" + "Vues Spotify : " + d.Spotify;
            }

            if (grouped) {
                tooltipText += "<br/>Total vues : " + d.totalViews;
            }

            d3.select(".tooltip")
                .style("opacity", .9)
                .html(tooltipText);
        })
        .on("mouseout", function (event, d) {
            d3.select(".tooltip")
                .style("opacity", 0);
        });

    document.addEventListener("click", (e) => {
        if (e.target.classList[0] == "material-symbols-outlined") {
            if (e.target.textContent == "play_circle") {
                e.target.textContent = "stop_circle"
            } else if (e.target.textContent == "stop_circle") {
                e.target.textContent = "play_circle";
            }

            const musicId = e.target.parentNode.children[0].id;
            playSong(musicId);
        }
    });

    let isPlaying = false;

    function playSong(id) {
        if (isPlaying) {
            document.getElementById(id).pause();
            isPlaying = false;
        } else {
            document.getElementById(id).play();
            isPlaying = true;
        }
    }

    lastSlide(data, "MONDE");
    lastSlide([data[2], data[1], data[6]], "M51-2");
});

function fillTitles() {
    const titles = document.querySelectorAll(".song-title");
    for (let i = 0; i < data.length-1; ++i) {
        titles[i].textContent = data[i].NomDuTitre;
    }
}