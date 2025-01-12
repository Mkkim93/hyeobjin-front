<template>
  <header class="header">
    <div class="header-inner">

      <h1>Company Logo</h1>
      <nav class="menu">
        <ul>

          <li><router-link to="/" tag="li"><h4>Home</h4></router-link></li>

          <li class="dropdown">
            <h4>회사소개</h4>
            <ul class="submenu">
              <li><router-link to="/about" tag="li">회사소개</router-link></li>
              <li><router-link to="/location" tag="li">찾아오시는 길</router-link></li>
              <li><router-link to="/history" tag="li">회사 연혁</router-link></li>
            </ul>
          </li>

          <li class="dropdown">
            <h4>제품소개</h4>
            <ul class="submenu">
              <li><router-link to="/kcc" tag="li">KCC</router-link></li>
              <li><router-link to="/hugre" tag="li">휴그린</router-link></li>
              <li><router-link to="/yerim" tag="li">예림</router-link></li>
            </ul>
          </li>

          <li class="dropdown">
            <h4>고객상담</h4>
            <ul class="submenu">
              <li><router-link to="/notice" tag="li">공지사항</router-link></li>
              <li><router-link to="/estimate" tag="li">견적요청</router-link></li>
              <li><router-link to="/support" tag="li">1:1문의</router-link></li>
              <li><router-link to="/asform" tag="li">A/S문의</router-link></li>
            </ul>
          </li>

        </ul>
      </nav>

      <div class="contact-info">
        <span>📞 010 - 4951 - 4944</span>
        <span>📞 042 - 583 - 3131</span>
      </div>
    </div>
  </header>
</template>

<script>

export default {
  name: 'HomeView',
  data() {
    return {


    }
  },
  props: {
  },

  components: {

  }
}
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  line-height: 1.6;
}

.contact-info {
  z-index: 1002;
}
h1 {
  z-index: 1001;
}

.header {
  background-color: #000;
  color: #fff;
  padding: 10px 20px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu {
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  gap: 30px;
  position: fixed;
  font-size: 1.5rem;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 5px;
  margin-top: 145px;
  z-index: 1000;
  box-sizing: border-box;
  white-space: nowrap;
  flex: 1;
}

.menu ul {
  list-style: none;
  background-color: black;
  color: aliceblue;
  margin: 0;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  width: 100%;
  margin-bottom: 50px;
}

.menu li {
  position: relative;
  display: block;
  padding: 10px 40px;
  cursor: pointer;
  background-color: black;
  color: aliceblue;
  text-align: center;
  margin: 0;
}

.submenu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0; /* 부모 메뉴 항목의 중앙으로 조정 */
  transform: translateX(-50%); /* 정확하게 중앙 정렬 */
  width: max-content;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 0;
  margin: 0;
  white-space: nowrap;
  border: none;
  z-index: 1000;
  opacity: 0;
  transform: translateY(20px);
  pointer-events: none;
}

.menu li:hover .submenu {
  display: block;
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: auto;
}


.submenu li:hover {
  background: #444;
  cursor: pointer;
}

.menu li:hover {
  background-color: #333;

}

@media screen and (max-width: 768px) {
  .menu {
    flex-direction: column;
    height: auto;
  }

  .menu li {
    padding: 20px;
  }
}

.router-link-active {
  color: inherit !important;
  text-decoration: none;
}

.router-link-exact-active {
  color: inherit !important;
  text-decoration: none;
}

a {
  color: inherit;
  text-decoration: none;
}

a,
.router-link-active,
.router-link-exact-active {
  background-color: transparent !important;
  outline: none;
}

a:focus,
.router-link-active:focus,
.router-link-exact-active:focus {
  background-color: transparent !important;
  outline: none;
}

a:active,
.router-link-active:active,
.router-link-exact-active:active {
  background-color: transparent !important;
  outline: none;
}

.contact-info span {
  margin-left: 50px;
}

.contact-info span:nth-child(2) {
  padding-right: 30px; /* 두 번째 span에 패딩 추가 */
}
</style>