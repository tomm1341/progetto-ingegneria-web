<template>
    <div class="container" id="app1">
        <h1 class="text-center mt-5">Registrati</h1>
        <form
        autocomplete="off"
        class="align-items-center text-center"
        >
        <div class="form-floating ms-5 col-11 col-md-10 me-0">
            <input
            type="text"
            id="nome"
            name="nome"
            class="form-control"
            placeholder="nome"
            required
            />
            <label for="nome" class="text-secondary">Nome</label>
        </div>

    <div class="form-floating ms-5 col-11 col-md-10 me-0">
            <input
            type="text"
            id="cognome"
            name="cognome"
            class="form-control"
            placeholder="cognome"
            required
            />
            <label for="cognome" class="text-secondary">Cognome</label>
        </div>
    <div class="form-floating ms-5 col-11 col-md-10 me-0">
            <input
            type="text"
            id="username"
            name="username"
            class="form-control"
            placeholder="Username"
            required
            />
            <label for="username" class="text-secondary">Username</label>
        </div>
    <div class="form-floating ms-5 col-11 col-md-10 me-0">
            <input
            type="email"
            id="email"
            name="email"
            class="form-control"
            placeholder="name@example.com"
            required
            />
            <label for="email" class="text-secondary">Email</label>
        </div>
    <div class="form-floating ms-5 col-11 col-md-10 me-0">
            <input
            type="password"
            id="password"
            name="password"
            class="form-control"
            placeholder="Password"
            required
            />
            <label for="password" class="text-secondary">Password</label>
        </div>
    <div class="form-floating ms-5 mb-4 col-11 col-md-10 me-0">
            <select
            id="genere"
            name="genere"
            class="form-select"
            required
            >
            <option value="" selected disabled>Seleziona un'opzione</option>
            <option value="maschio">Maschio</option>
            <option value="femmina">Femmina</option>
            <option value="altro">Altro</option>
            </select>
            <label for="genere" class="text-secondary">Genere</label>
        </div>
    <div class="form-floating ms-5 col-11 col-md-10 me-0">
            <input
            type="number"
            id="età"
            name="età"
            class="form-control"
            placeholder="Età"
            v-positive-number
            required
            />
            <label for="età" class="text-secondary">Età</label>
        </div>
    <div class="form-floating ms-5 col-11 col-md-10 me-0">
            <input
                type="professione"
                id="professione"
                name="professione"
                class="form-control"
                placeholder="Professione"
            />
            <label for="professione" class="text-secondary">Professione</label>
            </div>
    <div class="form-floating ms-5 mb-4 col-11 col-md-10 me-0">
            <select
            id="ruolo"
            name="ruolo"
            class="form-select"
            required
            >
            <option value="user">user</option>
            <option value="admin">admin</option>
            </select>
            <label for="ruolo" class="text-secondary">Ruolo</label>
        </div>

    <div class="col-2">
            <input
            class="btn add-btn bg-success"
            type="submit"
            value="Iscriviti"
            id="login"
            />
        </div>
    <div class="col-2">
            <input
            class="btn add-btn btn-success d-none"
            type="button"
            value="Conferma"
            id="confbutton"
            />
        </div>
        </form>

    <div class="row mt-5 ms-3 justify-content-center" id="table">
        <div class="container bg-danger d-none text-center" id="eliminato">
            <p class="pt-2">Utente eliminato</p>
        </div>
        </div>
    </div>
</template>