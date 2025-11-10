document.addEventListener('DOMContentLoaded', () => {
    const petsContainer = document.getElementById('pets-list');
    const filterButtons = document.querySelectorAll('.filter-btn');

    function handleScroll() {
        // Verifica quantos pixels a página rolou
        if (window.scrollY > scrollThreshold) {
            // Adiciona a classe 'sticky' (com a sombra)
            nav.classList.add('sticky');
        } else {
            // Remove a classe 'sticky' (sem a sombra)
            nav.classList.remove('sticky');
        }
    }
    // Estado atual dos filtros
    let currentFilters = {
        genero: 'all',
        porte: 'all'
    };

    /**
     * Função que renderiza um único card de pet.
     * @param {Object} pet - Objeto pet do array PETS_DATA.
     */
    function renderPetCard(pet) {
        // Gera a lista de descrição (<li>)
        const descriptionList = pet.descricao.map(item => `<li>${item}</li>`).join('');

        // Gera as tags <img> com os caminhos corretos e alt text
        const imageTags = pet.imagens.map((src, index) => `
            <img src="${src}" alt="${pet.nome}, imagem ${index + 1}. Cachorro para adoção.">
        `).join('');

        // Monta o HTML completo do card
        const cardHTML = `
            <div class="pet-card" data-genero="${pet.genero}" data-porte="${pet.porte}">
                <div class="pet-content">
                    
                    <div class="pet-images">
                        ${imageTags}
                    </div>
                    
                    <div class="pet-info">
                        ${pet.em_destaque ? '<div class="ribbon"><i class="fas fa-star"></i></div>' : ''}

                        <h2>${pet.nome.toUpperCase()}</h2>
                        <h3>DESCRIÇÃO:</h3>

                        <ul>
                            ${descriptionList}
                        </ul>
                    </div>
                </div>

                <div class="call-to-action" data-pet-id="${pet.id}">
                    ELE MERECE TER UMA FAMÍLIA
                </div>
            </div>
        `;
        return cardHTML;
    }

    /**
     * Aplica os filtros e atualiza a lista de pets.
     */
    function applyFilters() {
        // Filtra o PETS_DATA
        const filteredPets = PETS_DATA.filter(pet => {
            const matchesGenero = currentFilters.genero === 'all' || pet.genero === currentFilters.genero;
            const matchesPorte = currentFilters.porte === 'all' || pet.porte === currentFilters.porte;
            return matchesGenero && matchesPorte;
        });

        // Limpa o contêiner
        petsContainer.innerHTML = '';

        // Renderiza os cards filtrados
        if (filteredPets.length > 0) {
            filteredPets.forEach(pet => {
                petsContainer.innerHTML += renderPetCard(pet);
            });
        } else {
            petsContainer.innerHTML = '<p style="text-align: center; width: 100%; font-size: 1.5rem; margin-top: 50px;">Nenhum pet encontrado com os filtros selecionados.</p>';
        }
    }

    // Inicializa a renderização de todos os pets
    applyFilters();

    // Adiciona event listeners aos botões de filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const filterValue = e.target.dataset.filter;
            const filterType = e.target.closest('.filter-group').querySelector('label').textContent.includes('Gênero') ? 'genero' : 'porte';
            
            // Remove a classe 'active' do grupo
            e.target.closest('.filter-group').querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            
            // Adiciona a classe 'active' ao botão clicado
            e.target.classList.add('active');

            // Atualiza o estado do filtro
            currentFilters[filterType] = filterValue;

            // Re-aplica os filtros
            applyFilters();
        });
    });

    // Adiciona evento de clique para o botão "call-to-action" (Pode ser o link do formulário)
    petsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('call-to-action')) {
            const petId = e.target.dataset.petId;
            // Redireciona para o formulário de adoção, possivelmente com o nome do pet
            // TODO: Substitua a URL abaixo pelo seu link real do formulário!
            window.location.href = `FORMULARIO_DE_ADOCAO.html?pet=${petId}`; 
        }
    });

});