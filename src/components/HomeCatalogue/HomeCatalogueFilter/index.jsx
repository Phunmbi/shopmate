import React, {Component, Fragment} from 'react';
import './HomeCatalogueFilter.scss';

export class HomeCatalogueFilter extends Component {
	defaultState = {
		department: {
			Regional: {
				id: 1,
				status: false
			},
			Nature: {
				id: 2,
				status: false
			},
			Seasonal: {
				id: 3,
				status: false
			},
		},
		category: {
			French: {
				id: 1,
				status: false
			},
			Italian: {
				id: 2,
				status: false
			},
			Irish: {
				id: 3,
				status: false
			},
			Animal: {
				id: 4,
				status: false
			},
			Flower: {
				id: 5,
				status: false
			},
			Christmas: {
				id: 6,
				status: false
			},
			Valentine: {
				id: 7,
				status: false
			}
		},
	};

	state = {...this.defaultState};

	componentDidMount () {
		const checkedStatus = localStorage.getItem( "filtering" );
		const selectedDepartment = localStorage.getItem( "selectedDepartment" );
		const selectedCategory = localStorage.getItem('selectedCategory');
		if ( checkedStatus ) {
			const {department, category} = this.defaultState;
			this.setState({
				department: {
					...department,
					[selectedDepartment]: {
						...this.defaultState.department[ selectedDepartment],
						status: true,
					},
				},
				category: {
					...category,
					[ selectedCategory ]: {
						...this.defaultState.category[ selectedCategory ],
						status: true
					}
				}
			});
		}
	}

	handleCategoryChange = event => {
		const {
			target: {value, checked},
		} = event;
		const {category} = this.defaultState;
		localStorage.setItem('selectedCategory', value);
		localStorage.setItem( "selectedCategoryID", this.state.category[value].id );
		localStorage.setItem( "isACategorySelected", "true" );
		this.setState( {
			category: {
				...category,
				[ value ]: {
					...this.defaultState.category[ value ],
					status: checked
				},
			},
		} );
	};

	handleDepartmentChange = event => {
		const {
			target: { value, checked },
		} = event;
		const {department} = this.defaultState;
		localStorage.setItem( "selectedDepartmentID", this.state.department[value].id );
		localStorage.setItem( 'selectedDepartment', value );
        localStorage.setItem( "isADepartmentSelected", "true" );
		this.setState({
			department: {
				...department,
				[ value ]: {
					...this.defaultState.department[ value ],
					status: checked
				},
			},
		});
	};

	renderCategories = ( departments ) => {
		for (const key in departments) {
			if (departments.hasOwnProperty(key)) {
				const element = departments[key];
				if ( element.status ) {
					return this.switchCategories(key);
				}
			}
		}
	};

	switchCategories = ( categories ) => {
		switch (categories) {
			case 'Regional':
				return (
					<Fragment>
						<div>
							<input
								type="radio"
								name="category"
								id="French"
								value="French"
								onChange={this.handleCategoryChange}
								checked={this.state.category.French.status}
							/>
							<label htmlFor="French">French</label>
						</div>
						<div>
							<input
								type="radio"
								name="category"
								id="Italian"
								value="Italian"
								onChange={this.handleCategoryChange}
								checked={this.state.category.Italian.status}
							/>
							<label htmlFor="Italian">Italian</label>
						</div>
						<div>
							<input
								type="radio"
								name="category"
								id="Irish"
								value="Irish"
								onChange={this.handleCategoryChange}
								checked={this.state.category.Irish.status}
							/>
							<label htmlFor="Irish">Irish</label>
						</div>
					</Fragment>
				);
			case 'Seasonal':
				return (
					<Fragment>
						<div>
							<input
								type="radio"
								name="category"
								id="Christmas"
								value="Christmas"
								onChange={this.handleCategoryChange}
								checked={this.state.category.Christmas.status}
							/>
							<label htmlFor="Christmas">Christmas</label>
						</div>
						<div>
							<input
								type="radio"
								name="category"
								id="Valentine"
								value="Valentine"
								onChange={this.handleCategoryChange}
								checked={this.state.category.Valentine.status}
							/>
							<label htmlFor="Valentine">Valentine's</label>
						</div>
					</Fragment>
				);
			case 'Nature':
				return (
					<Fragment>
						<div>
							<input
								type="radio"
								name="category"
								id="Animal"
								value="Animal"
								onChange={this.handleCategoryChange}
								checked={this.state.category.Animal.status}
							/>
							<label htmlFor="Animal">Animal</label>
						</div>
						<div>
							<input
								type="radio"
								name="category"
								id="Flower"
								value="Flower"
								onChange={this.handleCategoryChange}
								checked={this.state.category.Flower.status}
							/>
							<label htmlFor="Flower">Flower</label>
						</div>
					</Fragment>
				);
			default:
				break;
		}
	};

	runFilter = () => {
		const {
			filterAllCategories,
			filterAllDepartments
		} = this.props;
		const categorySelected = localStorage.getItem( "isACategorySelected" );
        const departmentSelected = localStorage.getItem( "isADepartmentSelected" );

		switch (departmentSelected) {
			case "true":
                return(
                    categorySelected ? filterAllCategories(localStorage.getItem('selectedCategoryID')) : filterAllDepartments(localStorage.getItem('selectedDepartmentID'))
				);
			case "false":
				return null;
			default:
				return null;
        }
	};

	render () {
		const {department} = this.state;
		const { resetFilter } = this.props;
    return (
			<Fragment>
				<div className="filter-main">
					<div className="filter-main__container">
						<div className="filter-main__results">
							<h2>Filter {this.props.productCount} items</h2>
						</div>
						<div className="filter-main__selection">
							<div className="filter-main__department">
								<h3>Department</h3>
								<div className="filter-main__form__wrapper">
									<form className="filter-main__form">
										<div>
											<input
												type="radio"
												id="Regional"
												onChange={this.handleDepartmentChange}
												name="department"
												value="Regional"
												checked={this.state.department.Regional.status}
											/>
											<label htmlFor="Regional">Regional</label>
										</div>
										<div>
											<input
												type="radio"
												id="Nature"
												onChange={this.handleDepartmentChange}
												name="department"
												value="Nature"
												checked={this.state.department.Nature.status}
											/>
											<label htmlFor="Nature">Nature</label>
										</div>
										<div>
											<input
												type="radio"
												id="Seasonal"
												onChange={this.handleDepartmentChange}
												name="department"
												value="Seasonal"
												checked={this.state.department.Seasonal.status}
											/>
											<label htmlFor="Seasonal">Seasonal</label>
										</div>
									</form>
								</div>
							</div>
							<div className="filter-main__category">
								<h3>Category</h3>
								<div className="filter-main__form__wrapper">
									<form className="filter-main__form">{this.renderCategories(department)}</form>
								</div>
							</div>
						</div>
						<div className="filter-main__action">
							<button onClick={() => this.runFilter()}>Apply</button>
							<p onClick={resetFilter}>x Clear All</p>
						</div>
					</div>
				</div>
			</Fragment>
		);
  }
}

export default HomeCatalogueFilter;
