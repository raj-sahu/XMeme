var typed = new Typed("#Hello", {
  strings: ["XMeme :", "Top 100 Uploaded Memes :"],
  typeSpeed: 100,
  backSpeed: 110,
  smartBackspace: true,
  startDelay: 2,
  showCursor: false,
  loop: true,
});
function format(source, params) {
  $.each(params, function (i, n) {
    source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
  });
  return source;
}
function cardDesign() {
  Vue.config.devtools = true;
  Vue.component("card", {
    template: `
    <div class="card-wrap"
      @mousemove="handleMouseMove"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      ref="card">
      <div class="card"
        :style="cardStyle">
        <div class="card-bg" :style="[cardBgTransform, cardBgImage]"></div>
        <div class="card-info">
          <slot name="header"></slot>
          <slot name="content"></slot>
        </div>
      </div>
    </div>`,
    mounted() {
      this.width = this.$refs.card.offsetWidth;
      this.height = this.$refs.card.offsetHeight;
    },
    props: ["dataImage"],
    data: () => ({
      width: 0,
      height: 0,
      mouseX: 0,
      mouseY: 0,
      mouseLeaveDelay: null,
    }),

    computed: {
      mousePX() {
        return this.mouseX / this.width;
      },
      mousePY() {
        return this.mouseY / this.height;
      },
      cardStyle() {
        const rX = this.mousePX * 30;
        const rY = this.mousePY * -30;
        return {
          transform: `rotateY(${rX}deg) rotateX(${rY}deg)`,
        };
      },
      cardBgTransform() {
        const tX = this.mousePX * -40;
        const tY = this.mousePY * -40;
        return {
          transform: `translateX(${tX}px) translateY(${tY}px)`,
        };
      },
      cardBgImage() {
        return {
          backgroundImage: `url(${this.dataImage})`,
        };
      },
    },

    methods: {
      handleMouseMove(e) {
        this.mouseX = e.pageX - this.$refs.card.offsetLeft - this.width / 2;
        this.mouseY = e.pageY - this.$refs.card.offsetTop - this.height / 2;
      },
      handleMouseEnter() {
        clearTimeout(this.mouseLeaveDelay);
      },
      handleMouseLeave() {
        this.mouseLeaveDelay = setTimeout(() => {
          this.mouseX = 0;
          this.mouseY = 0;
        }, 1000);
      },
    },
  });

  const app = new Vue({
    el: "#app",
  });
}
function bgparticle() {
  particlesJS(
    "particle",

    {
      particles: {
        number: {
          value: 150,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: "#ececec",
        },
        shape: {
          type: ["star", "circle"],
          stroke: {
            width: 0,
            color: "#000000",
          },
          polygon: {
            nb_sides: 5,
          },
          image: {
            src: "img/github.svg",
            width: 100,
            height: 100,
          },
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 5,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: false,
          distance: 150,
          color: "#596275",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 6,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "repulse",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: {
            distance: 200,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
      config_demo: {
        hide_card: false,
        background_color: "#e15f41",
        background_image: "",
        background_position: "50% 50%",
        background_repeat: "no-repeat",
        background_size: "cover",
      },
    }
  );
}
function getCards() {
  fetch("http://127.0.0.1:8000/memes/", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((x) => {
      console.log(x[0]);
      return x;
    })
    .then((x) => {
      let text =
        '<card data-image="{0}"> \
            <h1 slot = "header" > {1}</h1 >\
            <p slot = "content" >&nbsp;Uploaded by {2}<br>@&ensp;{4}&emsp;{3}</p >\
            </card > ';

      for (var meme of x) {
        $("#app").append(
          format(text, [
            meme["url"],
            meme["caption"],
            meme["name"],
            meme["upload_time"].slice(0, 10),
            meme["upload_time"].slice(11, 16),
          ])
        );
      }
      // console.log(text);
      return text;
    })
    .then((text) => {
      // $("#app").append(text);
      // $("#app").append(
      //   '<card data-image="https://i.redd.it/vvn2d39mu2g61.jpg"><h1 slot = "header">Kane</h1 ><p slot ="content">SuperMAN.</p></card >'
      // );
      // $("#app").append(
      //   '<card data-image="https://i.redd.it/vvn2d39mu2g61.jpg"><h1 slot = "header">Kane</h1 ><p slot ="content">SuperMAN.</p></card >'
      // );
      cardDesign();
      bgparticle();
    });
}
function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
getCards();
////POST
formElem.onsubmit = async (e) => {
  e.preventDefault();

  var form = document.querySelector("#formElem");
  data = {
    name: form.querySelector('input[name="name"]').value,
    caption: form.querySelector('input[name="caption"]').value,
    url: form.querySelector('input[name="url"]').value,
  };

  let response = await fetch("http://127.0.0.1:8000/memes/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.status == "200") {
    Swal.fire({
      icon: "success",
      title: "Meme Uploaded",
      showConfirmButton: false,
      timer: 850,
    });
  } else if (response.status == "415")
    Swal.fire({
      title: "Oops...",
      text: "Unable to fetch meme check url",
      icon: "error",
      confirmButtonText: "Ok",
    });
  else
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!" + response.status,
    });
  if (response.status == "200") {
    sleep(1000).then(() => {
      window.location.reload();
    });
  }
};

var $input = $(".form-fieldset > input");
$input.blur(function (e) {
  $(this).toggleClass("filled", !!$(this).val());
});
