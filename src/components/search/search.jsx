import './index.css'

export const Search = ({ setSearch }) => {
    return {
        < input

    placeholder = 'search..'
    onChange = {(e) => setSeach(e.target.value)} /* сюда передается элемент и данный компонент указывается в header*/
className = 'search__input'
    />
    }
}