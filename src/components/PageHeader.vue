<template>
    <header class="page-header">
        <div class="container">
            <div class="flex">
                <h1>Terminator Tours</h1>

                <nav>
                    <ul>
                        <li><router-link :to="{ name: 'home' }">Schedule</router-link></li>
                        <li><router-link :to="{ name: 'book' }">Book</router-link></li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
</template>

<style lang="scss">
@import '../css/_helpers.scss';

.page-header {
	background: $primaryBgColour;

	.flex {
		display: flex;
		height: 70px;
		justify-content: space-between;
		align-items: center;
	}

	h1 {
		font-size: convert(25);
        color: $secondaryTextColour;
		margin: 0;
	}

	nav {
		ul {
			display: flex;
		}

		a {
			font-size: convert(20);
            color: $secondaryTextColour;
    		padding: 7px 15px;

			&:hover, &:focus, &.router-link-exact-active {
                // color: $secondaryTextColour;
                text-decoration: underline;
			}
		}
	}
}
</style>