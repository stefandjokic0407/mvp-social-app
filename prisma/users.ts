import { UserCreateInput } from '../graphql/generated/type-graphql'
export const users: UserCreateInput[] = [
	{
		name: 'Alice',
		updatedAt: new Date('2020-08-09T16:37:36.961Z'),
		image: 'https://res.cloudinary.com/crbaucom/image/upload/v1596991044/rushmore/alwas.jpg',
		email: 'alice@prisma.io',
		username: 'alice1',
		createdAt: new Date('2020-08-08T15:46:02.980Z'),
		totyms: {
			create: [
				{
					updatedAt: new Date('2020-08-08T15:47:04.351Z'),
					description: '',
					createdAt: new Date('2020-08-08T15:46:02.980Z'),
					coverPhoto:
						'https://res.cloudinary.com/crbaucom/image/upload/v1596345421/rushmore/bestnbaplayercover.png',
					title: 'Best basketball players',
					items: {
						create: [
							{
								name: 'MJ',
								image:
									'https://res.cloudinary.com/crbaucom/image/upload/v1596345421/rushmore/bestnbaplayercover.png',
								description: 'Air Jordan',
							},
							{
								name: 'LBJ',
								description: 'The King',
							},
							{
								name: 'Kobe',
								description: 'Mamba',
							},
							{
								name: 'Magic',
								description: '',
							},
						],
					},
				},
				{
					updatedAt: new Date('2020-08-08T15:46:52.347Z'),
					description: '',
					createdAt: new Date('2020-08-08T15:46:02.980Z'),
					coverPhoto:
						'https://res.cloudinary.com/crbaucom/image/upload/v1596345738/rushmore/mlb_a_ryanventura_cr__1296x729.jpg',
					title: 'Favorite baseball players',
					items: {
						create: [
							{
								name: 'Nolan Ryan',
								image:
									'https://res.cloudinary.com/crbaucom/image/upload/v1596345738/rushmore/mlb_a_ryanventura_cr__1296x729.jpg',
								description: '#34',
							},
							{
								name: 'Mookie Betts',
								description: '',
							},
							{
								name: 'Cal Ripken Jr.',
								description: '',
							},
							{
								name: 'Ricky Henderson',
								description: '',
							},
						],
					},
				},
			],
		},
	},
	{
		name: 'Bob',
		updatedAt: new Date('2020-08-09T16:39:17.062Z'),
		image: 'https://res.cloudinary.com/crbaucom/image/upload/v1596991147/rushmore/alwas2.jpg',
		email: 'bob@prisma.io',
		username: 'bobby1',
		createdAt: new Date('2020-08-08T15:46:03.853Z'),
		totyms: {
			create: [
				{
					updatedAt: new Date('2020-08-08T15:46:40.499Z'),
					description: '',
					createdAt: new Date('2020-08-08T15:46:03.853Z'),
					coverPhoto: 'https://res.cloudinary.com/crbaucom/image/upload/v1596345498/rushmore/mj.jpg',
					title: 'Best basketball players',
					items: {
						create: [
							{
								name: 'Michael Jordan',
								image: 'https://res.cloudinary.com/crbaucom/image/upload/v1596345498/rushmore/mj.jpg',
								description: 'Air Jordan',
							},
							{
								name: 'Lebron James',
								description: 'The King',
							},
							{
								name: 'Larry Bird',
								description: '',
							},
							{
								name: 'Kobe Bryant',
								description: '',
							},
						],
					},
				},
				{
					updatedAt: new Date('2020-08-08T15:46:27.396Z'),
					description: '',
					createdAt: new Date('2020-08-08T15:46:03.853Z'),
					coverPhoto: 'https://res.cloudinary.com/crbaucom/image/upload/v1596345738/rushmore/bestredsoxs.jpg',
					title: 'Favorite baseball players',
					items: {
						create: [
							{
								name: 'Nolan Ryan',
								image:
									'https://res.cloudinary.com/crbaucom/image/upload/v1596345738/rushmore/bestredsoxs.jpg',
								description: '#34',
							},
							{
								name: 'Babe Ruth',
								description: '',
							},
							{
								name: 'Cal Ripken Jr.',
								description: '',
							},
							{
								name: 'Ricky Henderson',
								description: '',
							},
						],
					},
				},
			],
		},
	},
	{
		name: 'CB',
		updatedAt: new Date('2020-08-08T15:47:52.301Z'),
		image: 'https://res.cloudinary.com/crbaucom/image/upload/v1595788943/rushmore/avatar-default.png',
		email: 'cb1@gmaail.com',
		username: 'cb',
		createdAt: new Date('2020-08-08T15:47:52.301Z'),
		totyms: {
			create: [
				{
					updatedAt: new Date('2020-08-08T15:48:10.062Z'),
					createdAt: new Date('2020-08-08T15:48:10.062Z'),
					coverPhoto:
						'https://res.cloudinary.com/crbaucom/image/upload/v1595788943/rushmore/rm-card-default.png',
					title: 'Favorite colors',
					items: {
						create: [
							{
								name: 'carolina blue',
								image:
									'https://res.cloudinary.com/crbaucom/image/upload/v1595788943/rushmore/rm-card-default.png',
							},
							{
								name: 'green',
							},
							{
								name: 'gray',
							},
							{
								name: 'black',
							},
						],
					},
				},
			],
		},
	},
	{
		name: 'CHRIS BAUCOM',
		updatedAt: new Date('2020-10-24T03:12:11.265Z'),
		image:
			'https://res.cloudinary.com/crbaucom/image/upload/v1603509116/rushmore/Screen_Shot_2020-10-23_at_11.11.31_PM.png',
		email: 'chrisbaucom83@gmail.com',
		username: 'cbd',
		createdAt: new Date('2020-09-06T04:59:01.808Z'),
		totyms: {
			create: [
				{
					updatedAt: new Date('2020-09-13T13:20:53.207Z'),
					createdAt: new Date('2020-09-13T13:20:53.207Z'),
					coverPhoto:
						'https://res.cloudinary.com/crbaucom/image/upload/v1600003227/rushmore/ryiu6eyrq4nin7zfcsik.jpg',
					title: 'Dark horse',
					items: {
						create: [
							{
								name: 'Pizza Hut',
								image:
									'https://res.cloudinary.com/crbaucom/image/upload/v1600003227/rushmore/ryiu6eyrq4nin7zfcsik.jpg',
							},
							{
								name: 'Dominoes',
								image:
									'https://res.cloudinary.com/crbaucom/image/upload/v1600003244/rushmore/dkqmswnbkvvdwblcfewe.jpg',
							},
							{
								name: "Bertucci's",
							},
							{
								name: "Cici's",
							},
						],
					},
				},
				{
					updatedAt: new Date('2020-09-13T20:36:46.863Z'),
					createdAt: new Date('2020-09-13T20:36:46.863Z'),
					coverPhoto:
						'https://res.cloudinary.com/crbaucom/image/upload/v1600029329/rushmore/lmhpnhby4kxeju8sw6vv.jpg',
					title: 'Best Pizza in Boston',
					items: {
						create: [
							{
								name: 'Pizza Hut',
								image:
									'https://res.cloudinary.com/crbaucom/image/upload/v1600029329/rushmore/lmhpnhby4kxeju8sw6vv.jpg',
							},
							{
								name: 'Dominoes',
								image:
									'https://res.cloudinary.com/crbaucom/image/upload/v1600029376/rushmore/ybebqjwno8ezwbudd4l2.jpg',
							},
							{
								name: "Bertucci's",
							},
							{
								name: "Cici's",
							},
						],
					},
				},
				{
					updatedAt: new Date('2020-09-13T20:41:10.274Z'),
					createdAt: new Date('2020-09-13T20:41:10.274Z'),
					coverPhoto:
						'https://res.cloudinary.com/crbaucom/image/upload/v1600029666/rushmore/xmivwd5g9g30v7zemsro.jpg',
					title: 'Best Tacos in Melrose',
					items: {
						create: [
							{
								name: 'Taco Casa',
								image:
									'https://res.cloudinary.com/crbaucom/image/upload/v1600029666/rushmore/xmivwd5g9g30v7zemsro.jpg',
							},
							{
								name: 'Taco Bell',
							},
							{
								name: 'Taco Bueno',
							},
							{
								name: 'Taco Taco',
							},
						],
					},
				},
				{
					updatedAt: new Date('2020-10-11T03:04:15.153Z'),
					description: '',
					createdAt: new Date('2020-10-11T03:02:36.829Z'),
					coverPhoto:
						'https://res.cloudinary.com/crbaucom/image/upload/v1602385217/rushmore/c9mg2pfhkvcex1fjms4m.jpg',
					title: 'Best Zoom Backgrounds',
					items: {
						create: [
							{
								name: 'Ron Swanson',
								image:
									'https://res.cloudinary.com/crbaucom/image/upload/v1602385217/rushmore/c9mg2pfhkvcex1fjms4m.jpg',
								description: "Ron Swanson's office",
							},
							{
								name: 'The Office',
								image:
									'https://res.cloudinary.com/crbaucom/image/upload/v1602385254/rushmore/nrbqniecperqrkkdokva.jpg',
								description: 'The Office Background',
							},
							{
								name: 'John Oliver',
								image:
									'https://res.cloudinary.com/crbaucom/image/upload/v1602385300/rushmore/eli6tm45st3kkewzkak3.jpg',
								description:
									"Johnny Oliver's studio background, well, pre-COVID. Now he films from a strange blank void. ",
							},
							{
								name: 'Game of Thrones',
								image:
									'https://res.cloudinary.com/crbaucom/image/upload/v1602385335/rushmore/rmtt8shthnuemnm8p2aj.jpg',
								description: 'Watch The Throne',
							},
						],
					},
				},
				{
					updatedAt: new Date('2020-10-24T03:51:46.730Z'),
					createdAt: new Date('2020-10-24T03:51:46.730Z'),
					coverPhoto:
						'https://res.cloudinary.com/crbaucom/image/upload/v1603511435/rushmore/qdndv3xqdpfx9g2fedgx.jpg',
					title: 'NH Leaves',
					items: {
						create: [
							{
								name: '11',
								image:
									'https://res.cloudinary.com/crbaucom/image/upload/v1603511435/rushmore/qdndv3xqdpfx9g2fedgx.jpg',
							},
							{
								name: '22',
								image:
									'https://res.cloudinary.com/crbaucom/image/upload/v1603511460/rushmore/srikcjnfyor0fpranxiv.jpg',
							},
							{
								name: '33',
								image:
									'https://res.cloudinary.com/crbaucom/image/upload/v1603511481/rushmore/b0828xcjuped0jgv99cf.jpg',
							},
							{
								name: '44',
								image:
									'https://res.cloudinary.com/crbaucom/image/upload/v1603511492/rushmore/nssvi9oapzhwwksbzt0u.jpg',
							},
						],
					},
				},
				{
					updatedAt: new Date('2020-11-03T21:37:58.642Z'),
					createdAt: new Date('2020-11-03T21:37:58.642Z'),
					coverPhoto:
						'https://res.cloudinary.com/crbaucom/image/upload/v1604439441/rushmore/fhtfezia1nztv3qryqxv.jpg',
					title: 'Fav horsies',
					items: {
						create: [
							{
								name: 'Horse1',
								image:
									'https://res.cloudinary.com/crbaucom/image/upload/v1604439441/rushmore/fhtfezia1nztv3qryqxv.jpg',
							},
							{
								name: 'horsey2',
							},
							{
								name: 'horse3',
							},
							{
								name: 'neiiiiighhhhhh',
								image:
									'https://res.cloudinary.com/crbaucom/image/upload/v1604439472/rushmore/j70pko50mmqajbiuxhzf.jpg',
							},
						],
					},
				},
				{
					updatedAt: new Date('2020-12-06T04:43:36.644Z'),
					createdAt: new Date('2020-12-06T04:43:36.644Z'),
					coverPhoto:
						'https://res.cloudinary.com/crbaucom/image/upload/v1607229680/rushmore/k203i8fwavxjwdktu3oc.jpg',
					title: 'Cool Cats',
					items: {
						create: [
							{
								name: 'Peewee',
								image:
									'https://res.cloudinary.com/crbaucom/image/upload/v1607229680/rushmore/k203i8fwavxjwdktu3oc.jpg',
								description: 'Coolest cat to ever live',
							},
							{
								name: 'Mowgli',
								image:
									'https://res.cloudinary.com/crbaucom/image/upload/v1607229713/rushmore/jhhyo6oztc7nnlqgqjhp.jpg',
								description: 'Another bad ass cat',
							},
							{
								name: 'MeowMeow',
								image:
									'https://res.cloudinary.com/crbaucom/image/upload/v1607229748/rushmore/xl4cnefikftitjj4fv7a.jpg',
								description: 'MEOOOOOW',
							},
							{
								name: 'Tony the Tiger',
								image:
									'https://res.cloudinary.com/crbaucom/image/upload/v1607229782/rushmore/cgp1vfafmvfz61vlqmuj.jpg',
								description: "They're GREAT!!!",
							},
						],
					},
				},
				{
					updatedAt: new Date('2020-12-06T05:12:27.483Z'),
					createdAt: new Date('2020-12-06T05:12:27.483Z'),
					coverPhoto:
						'https://res.cloudinary.com/crbaucom/image/upload/v1607231540/rushmore/uj3wicfungio9gtkgut0.jpg',
					title: 'Test phone',
					items: {
						create: [
							{
								name: 'As',
								image:
									'https://res.cloudinary.com/crbaucom/image/upload/v1607231540/rushmore/uj3wicfungio9gtkgut0.jpg',
								description: 'Needs some work ',
							},
							{
								name: 'As',
							},
							{
								name: 'As',
							},
							{
								name: 'Dds',
							},
						],
					},
				},
			],
		},
	},
	{
		name: 'CB',
		updatedAt: new Date('2020-11-09T03:06:01.097Z'),
		image: 'https://res.cloudinary.com/crbaucom/image/upload/v1604891135/rushmore/donkey.jpg',
		email: 'rbaucom16@gmail.com',
		username: 'donkey',
		createdAt: new Date('2020-09-08T00:05:06.221Z'),
		totyms: {
			create: [
				{
					updatedAt: new Date('2020-11-04T04:21:47.956Z'),
					createdAt: new Date('2020-11-04T04:21:47.956Z'),
					coverPhoto:
						'https://res.cloudinary.com/crbaucom/image/upload/v1604463464/rushmore/nh6m6tqdzlnprzc8hpkh.jpg',
					title: 'Fav horsies',
					items: {
						create: [
							{
								name: 'Mr. Ed',
								image:
									'https://res.cloudinary.com/crbaucom/image/upload/v1604463464/rushmore/nh6m6tqdzlnprzc8hpkh.jpg',
								description: 'Neiiiiighhhhhhhh',
							},
							{
								name: 'Seabiscuit',
								image:
									'https://res.cloudinary.com/crbaucom/image/upload/v1604463543/rushmore/vmqgtsxj7pfoofk17lkk.jpg',
							},
							{
								name: 'Quick Draw McGraw',
								image:
									'https://res.cloudinary.com/crbaucom/image/upload/v1604463651/rushmore/s2iltjcanvsd4mnltlmn.png',
								description: 'Pow Pow',
							},
							{
								name: 'My Little Pony',
								image:
									'https://res.cloudinary.com/crbaucom/image/upload/v1604463702/rushmore/sfn17y5pdqs25l0doxbr.png',
							},
						],
					},
				},
			],
		},
	},
	{
		name: 'Alex Was',
		updatedAt: new Date('2020-09-20T20:38:29.992Z'),
		image: 'https://res.cloudinary.com/crbaucom/image/upload/v1595788943/rushmore/avatar-default.png',
		email: 'was.alexm@gmail.com',
		username: 'AlWas',
		createdAt: new Date('2020-09-20T20:38:29.992Z'),
		totyms: {
			create: [
				{
					updatedAt: new Date('2020-09-20T20:50:35.943Z'),
					createdAt: new Date('2020-09-20T20:50:35.943Z'),
					coverPhoto:
						'https://res.cloudinary.com/crbaucom/image/upload/v1600635030/rushmore/zlv0nohrbocx8r4qbr45.jpg',
					title: 'Best Big Cats of All Time',
					items: {
						create: [
							{
								name: 'Cheetah',
								image:
									'https://res.cloudinary.com/crbaucom/image/upload/v1600635030/rushmore/zlv0nohrbocx8r4qbr45.jpg',
							},
							{
								name: 'Snow Leopard',
							},
							{
								name: 'Tiger',
							},
							{
								name: 'Lion',
							},
						],
					},
				},
			],
		},
	},
	{
		name: 'Brian Knight',
		updatedAt: new Date('2020-09-20T20:40:07.327Z'),
		image: 'https://res.cloudinary.com/crbaucom/image/upload/v1595788943/rushmore/avatar-default.png',
		email: 'baldrich.uofm@gmail.com',
		username: 'BrianKnight',
		createdAt: new Date('2020-09-20T20:40:07.327Z'),
		totyms: {
			create: [
				{
					updatedAt: new Date('2020-09-20T20:51:36.679Z'),
					createdAt: new Date('2020-09-20T20:51:36.679Z'),
					coverPhoto:
						'https://res.cloudinary.com/crbaucom/image/upload/v1600635042/rushmore/n0ng2sknjwiblutl1pum.jpg',
					title: 'Best Pizza in Ann Arbor',
					items: {
						create: [
							{
								name: "Joe's Pizza",
								image:
									'https://res.cloudinary.com/crbaucom/image/upload/v1600635042/rushmore/n0ng2sknjwiblutl1pum.jpg',
							},
							{
								name: 'Mani Osteria & Bar',
							},
							{
								name: 'Cottage Inn',
							},
							{
								name: "Jet's Pizza",
							},
						],
					},
				},
			],
		},
	},
]

