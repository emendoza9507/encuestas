<?php

namespace App\Policies;

use App\Models\Encuesta;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class EncuestaPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Encuesta $encuesta): bool
    {
        if($encuesta->create_by == $user->id) {
            return true;
        }

        if($encuesta->active == true) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->can('encuesta.store');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Encuesta $encuestum): bool
    {
        return $user->can('encuesta.update') && $user->id == $encuestum->created_by;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Encuesta $encuestum): bool
    {
        return $user->can('encuesta.delete') && $user->id == $encuestum->created_by;
    }

    public function clear(User $user, Encuesta $encuesta): bool
    {
        if($user->hasRole('Super-Admin')) {
            return true;
        }

        return $user->can('encuesta.clear') && $user->id == $encuesta->created_by;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Encuesta $encuestas): bool
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Encuesta $encuestas): bool
    {
        //
    }
}
