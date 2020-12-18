<template>
  <div class="cont ">
    <v-form
      ref="formSignIn"
      class="form sign-in"
    >
      <h2>Member login,</h2>
      <v-text-field
        v-model="email"
        label="E-mail"
        clearable
      />
      <v-text-field
        v-model="password"
        :append-icon="visibilityPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="visibilityPassword ? 'text' : 'password'"
        label="Password"
        autocomplete="section-blue shipping current-password"
        @click:append="visibilityPassword = !visibilityPassword"
      />
      <v-btn
        class="text-capitalize submit"
        color="#FFB74D"
        :loading="loading"
        @click="handleSignIn()"
      >
        Sign In
      </v-btn>
    </v-form>
  </div>
</template>
<script>

  export default {
    data: () => {
      return {
        visibilityPassword: false,
        showSignUp: '',
        email: '',
        password: '',
        loading: false,
      }
    },

    methods: {
      async handleSignIn () {
        this.loading = true
        const response = await this.$store.dispatch('auth/login', {
          username: this.email,
          password: this.password,
        })
        this.loading = false
        if (response) { this.$router.push({ name: 'Dashboard' }) }
      },

    },
  }
</script>

<style scoped lang="scss">
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
  background: #ededed;
}

input,
button {
  border: none;
  outline: none;
  background: none;
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
}

$contW: 900px;
$imgW: 260px;
$formW: $contW - $imgW;
$switchAT: 1.2s;

$inputW: 260px;
$btnH: 36px;

$diffRatio: ($contW - $imgW) / $contW;

@mixin signUpActive {
  .cont.s--signup & {
    @content;
  }
}

.tip {
  font-size: 20px;
  margin: 40px auto 50px;
  text-align: center;
}

.cont {
  overflow: hidden;
  position: relative;
  width: $contW;
  height: 550px;
  margin: 0 auto 0px;
  background: #fff;
  top: 150px;
}

.form {
  position: relative;
  width: $formW;
  height: 100%;
  transition: transform $switchAT ease-in-out;
  padding: 50px 30px 0;
}

.sub-cont {
  overflow: hidden;
  position: absolute;
  left: $formW;
  top: 0;
  width: $contW;
  height: 100%;
  padding-left: $imgW;
  background: white;
  transition: transform $switchAT ease-in-out;

  @include signUpActive {
    transform: translate3d($formW * -1, 0, 0);
  }
}

button {
  display: block;
  margin: 0 auto;
  width: $inputW;
  height: $btnH;
  border-radius: 30px;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
}

.img {
  overflow: hidden;
  z-index: 2;
  position: absolute;
  left: 0;
  top: 0;
  width: $imgW;
  height: 100%;
  padding-top: 360px;

  &:before {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    width: $contW;
    height: 100%;
    background-image: url("https://i.insider.com/5b9137e10ce5f5b27e8b4a0c?width=1067&format=jpeg");
    background-size: cover;
    transition: transform $switchAT ease-in-out;
  }

  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
  }

  @include signUpActive {
    &:before {
      transform: translate3d($formW, 0, 0);
    }
  }

  &__text {
    z-index: 2;
    position: absolute;
    left: 0;
    top: 50px;
    width: 100%;
    padding: 0 20px;
    text-align: center;
    color: #fff;
    transition: transform $switchAT ease-in-out;

    h2 {
      margin-bottom: 10px;
      font-weight: normal;
    }

    p {
      font-size: 14px;
      line-height: 1.5;
    }

    &.m--up {
      @include signUpActive {
        transform: translateX($imgW * 2);
      }
    }

    &.m--in {
      transform: translateX($imgW * -2);

      @include signUpActive {
        transform: translateX(0);
      }
    }
  }

  &__btn {
    overflow: hidden;
    z-index: 2;
    position: relative;
    width: 100px;
    height: $btnH;
    margin: 0 auto;
    background: transparent;
    color: #fff;
    text-transform: uppercase;
    font-size: 15px;
    cursor: pointer;

    &:after {
      content: "";
      z-index: 2;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      border: 2px solid #fff;
      border-radius: 30px;
    }

    span {
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      transition: transform $switchAT;

      &.m--in {
        transform: translateY($btnH * -2);

        @include signUpActive {
          transform: translateY(0);
        }
      }

      &.m--up {
        @include signUpActive {
          transform: translateY($btnH * 2);
        }
      }
    }
  }
}

h2 {
  width: 100%;
  font-size: 26px;
  text-align: center;
}

label {
  display: block;
  width: $inputW;
  margin: 25px auto 0;
  text-align: center;

  span {
    font-size: 12px;
    color: #cfcfcf;
    text-transform: uppercase;
  }
}

input {
  display: block;
  width: 100%;
  margin-top: 5px;
  padding-bottom: 5px;
  font-size: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  text-align: center;
}

.forgot-pass {
  margin-top: 15px;
  text-align: center;
  font-size: 12px;
  color: #d4af7a;
}

.submit {
  margin-top: 40px;
  margin-bottom: 20px;
  background: #d4af7a;
}

.gg-btn {
  border: 2px solid #d3dae9;
  color: darken(#d3dae9, 20%);

  span {
    font-weight: bold;
    color: darken(#768cb6, 20%);
  }
}

.sign-in {
  transition-timing-function: ease-out;
  width: 50%;
  @include signUpActive {
    transition-timing-function: ease-in-out;
    transition-duration: $switchAT;
    transform: translate3d($formW, 0, 0);
  }
}

.sign-up {
  transform: translate3d($contW * -1, 0, 0);
  width: 70%;

  @include signUpActive {
    transform: translate3d(0, 0, 0);
  }
}
</style>
