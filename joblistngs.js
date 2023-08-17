// informaçoes do trabalhos
const TAG_ACTIVE_CLASS = 'tag--active';
const pesquisar_secreta_CLASS = 'pesquisar-secreta';
const CLOSE_TAG_CLASS = 'close-tag';
const TAG_CLASS = 'tag';
const trabalhosListings = [
  {
    "id": 1,
    "company": "Photosnap",
    "logo": "./images/photosnap.svg",
    "new": true,
    "featured": true,
    "position": "Senior Frontend Developer",
    "role": "Frontend",
    "level": "Senior",
    "postedAt": "1d ago",
    "contract": "Full Time",
    "location": "USA Only",
    "languages": ["HTML", "CSS", "JavaScript"]
  },
  {
    "id": 2,
    "company": "Manage",
    "logo": "./images/manage.svg",
    "new": true,
    "featured": true,
    "position": "Fullstack Developer",
    "role": "Fullstack",
    "level": "Midweight",
    "postedAt": "1d ago",
    "contract": "Part Time",
    "location": "Remote",
    "languages": ["Python"],
    "tools": ["React"]
  },
  {
    "id": 3,
    "company": "Account",
    "logo": "./images/account.svg",
    "new": true,
    "featured": false,
    "position": "Junior Frontend Developer",
    "role": "Frontend",
    "level": "Junior",
    "postedAt": "2d ago",
    "contract": "Part Time",
    "location": "USA Only",
    "languages": ["JavaScript"],
    "tools": ["React", "Sass"]
  },
  {
    "id": 4,
    "company": "MyHome",
    "logo": "./images/myhome.svg",
    "new": false,
    "featured": false,
    "position": "Junior Frontend Developer",
    "role": "Frontend",
    "level": "Junior",
    "postedAt": "5d ago",
    "contract": "Contract",
    "location": "USA Only",
    "languages": ["CSS", "JavaScript"]
  },
  {
    "id": 5,
    "company": "Loop Studios",
    "logo": "./images/loop-studios.svg",
    "new": false,
    "featured": false,
    "position": "Software Engineer",
    "role": "FullStack",
    "level": "Midweight",
    "postedAt": "1w ago",
    "contract": "Full Time",
    "location": "Worldwide",
    "languages": ["JavaScript"],
    "tools": ["Ruby", "Sass"]
  },
  {
    "id": 6,
    "company": "FaceIt",
    "logo": "./images/faceit.svg",
    "new": false,
    "featured": false,
    "position": "Junior Backend Developer",
    "role": "Backend",
    "level": "Junior",
    "postedAt": "2w ago",
    "contract": "Full Time",
    "location": "UK Only",
    "tools": ["RoR"]
  },
  {
    "id": 7,
    "company": "Shortly",
    "logo": "./images/shortly.svg",
    "new": false,
    "featured": false,
    "position": "Junior Developer",
    "role": "Frontend",
    "level": "Junior",
    "postedAt": "2w ago",
    "contract": "Full Time",
    "location": "Worldwide",
    "languages": ["HTML", "JavaScript"],
    "tools": ["Sass"]
  },
  {
    "id": 8,
    "company": "Insure",
    "logo": "./images/insure.svg",
    "new": false,
    "featured": false,
    "position": "Junior Frontend Developer",
    "role": "Frontend",
    "level": "Junior",
    "postedAt": "2w ago",
    "contract": "Full Time",
    "location": "USA Only",
    "languages": ["JavaScript"],
    "tools": ["Vue, Sass"]
  },
  {
    "id": 9,
    "company": "Eyecam Co.",
    "logo": "./images/eyecam-co.svg",
    "new": false,
    "featured": false,
    "position": "Full Stack Engineer",
    "role": "Fullstack",
    "level": "Midweight",
    "postedAt": "3w ago",
    "contract": "Full Time",
    "location": "Worldwide",
    "languages": ["JavaScript", "Python"],
    "tools": ["Django"]
  },
  {
    "id": 10,
    "company": "The Air Filter Company",
    "logo": "./images/the-air-filter-company.svg",
    "featured": false,
    "position": "Front-end Dev",
    "role": "Frontend",
    "level": "Junior",
    "postedAt": "1mo ago",
    "contract": "Part Time",
    "location": "Worldwide",
    "languages": ["JavaScript"],
    "tools": ["React", "Sass"]
  }
]

function getTagHTML(tag, tagClasses) {
    return `<span class="${tagClasses}">
                ${tag}
            </span>`;
}
// Box dos trabalhos
function gettrabalhoListingHTML(trabalhoData, filterTags = []) {
    const trabalho_TAGS_PLACEHOLDER = '###trabalho_TAGS###';
    let trabalhoListingHTML = `
        <div class="trabalhos-item">
            <div class="trabalhosColuna">
                <img src="${trabalhoData.logo}" alt="${trabalhoData.company}" class="trabalhosImg" />
                <div class="trabalhosInfo">
                    <span class="trabalhosCompany">${trabalhoData.company}</span>
                    <span class="tituloTrabalho">${trabalhoData.position}</span>
                    
                    <ul class="trabalhos-dethalhes">
                        <li class="trabalhos-dethalhesItem">${trabalhoData.postedAt}</li>
                        <li class="trabalhos-dethalhesItem">${trabalhoData.contract}</li>
                        <li class="trabalhos-dethalhesItem">${trabalhoData.location}</li>
                    </ul>
                </div>
            </div>
            <div class="trabalhos-coluna trabalhos-colunaDireita">
                ${trabalho_TAGS_PLACEHOLDER}
            </div>
        </div>
    `;

    const tagsList = [
        trabalhoData.role,
        trabalhoData.level,
        ...(trabalhoData.languages || []),
        ...(trabalhoData.tools || [])
    ];
    const tagsListLowercase = tagsList.map(t => t && t.toLowerCase());
    const passesFilter = !filterTags.length || filterTags.every(tag => (
        tagsListLowercase.includes(tag && tag.toLowerCase())
    ));
    
    if (!passesFilter) {
        return '';
    }

    const tagsString = tagsList.reduce((acc, currentTag) => {
        const activeClass = (filterTags.includes(currentTag) && TAG_ACTIVE_CLASS) || '';

        return acc + getTagHTML(currentTag, `${TAG_CLASS} ${activeClass}`);
    }, '');

    return trabalhoListingHTML.replace(trabalho_TAGS_PLACEHOLDER, tagsString);
};

function toggleClass(el, className) {
    if (el.classList.contains(className)) {
        el.classList.remove(className);

        return;
    }
    
    el.classList.add(className);
}

function getpesquisarBarTags(tagValue, pesquisarContentEl) {
    let pesquisarBarTags = Array.from(pesquisarContentEl.children)
        .map(node => node.innerHTML && node.innerHTML.trim())
        .filter(tag => !!tag);

    if (pesquisarBarTags.includes(tagValue)) {
        pesquisarBarTags = pesquisarBarTags.filter(tag => tag !== tagValue);
    } else {
        pesquisarBarTags = [...pesquisarBarTags, tagValue];
    }

    return pesquisarBarTags;
}

function settrabalhosListings(filterTags) {
    const trabalhosListingsHTML = trabalhosListings.reduce((acc, currentListing) => {
        return acc + gettrabalhoListingHTML(currentListing, filterTags);
    }, '');
    
    document.getElementById('trabalhos').innerHTML = trabalhosListingsHTML;
}

function displaypesquisarWrapper(display = false) {
    const pesquisarWrapper = document.getElementById('pesquisar');
    
    if (display) {
        pesquisarWrapper.classList.remove(pesquisar_secreta_CLASS);

        return;
    }

    pesquisarWrapper.classList.add(pesquisar_secreta_CLASS);
}

function setpesquisarbarContent(pesquisarContentEl, tags) {
    pesquisarContentEl.innerHTML = tags.reduce((acc, currentTag) => {
        return acc + getTagHTML(currentTag, CLOSE_TAG_CLASS);
    }, '');
}

function resetState(pesquisarContentEl) {
    pesquisarContentEl.innerHTML = '';

    settrabalhosListings();
    displaypesquisarWrapper(false);
    toggleClass(targetEl, TAG_ACTIVE_CLASS);
}
//este codigo pertence a matheus vieira
window.addEventListener('click', (event) => {
    const targetEl = event.target;
    const targetText = targetEl.innerHTML.trim();
    const pesquisarContentEl = document.getElementById('pesquisar-content');
    const pesquisarBarTags = getpesquisarBarTags(targetText, pesquisarContentEl);

    if (targetEl.id === 'clear' || !pesquisarBarTags.length) {
        resetState(pesquisarContentEl);

        return;
    }

    if (![TAG_CLASS, CLOSE_TAG_CLASS].some(c => targetEl.classList.contains(c))) {
        return;
    }

    setpesquisarbarContent(pesquisarContentEl, pesquisarBarTags);
    toggleClass(targetEl, TAG_ACTIVE_CLASS);
    displaypesquisarWrapper(pesquisarBarTags.length > 0);
    settrabalhosListings(pesquisarBarTags);
});
new
settrabalhosListings()
//este codigo pertence a matheus vieira