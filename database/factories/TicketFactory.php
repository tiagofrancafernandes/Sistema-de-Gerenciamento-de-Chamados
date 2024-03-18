<?php

namespace Database\Factories;

use App\Enums\TicketStatus;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Customer;
use App\Models\Category;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ticket>
 */
class TicketFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->words(5, true),
            'content' => (
                '<p>Quo cumque voluptatem inventore ut expedita qui iusto. Eum et et qui ea ut unde.</p>'
                . '<p> Rerum enim ea cum quaerat non tenetur. Minima voluptas et maiores accusamus ut.</p>'
                . '<p>Ea minima ullam delectus aut  suscipit. . Numquam est voluptatem minus iste voluptatum est. </p>'
                . '<p>Provident ipsam nesciunt sed nihil ab dolorem. Id nobis sit et inventore consectetur impedit.</p>'
                . '<p>Incidunt molestias quo adipisci eveniet nihil voluptates earum veritatis. </p>'
                . '<p>Ipsam error nesciunt et explicabo id totam. Commodi vel porro dolore facilis. </p>'
                . '<p>Architecto illo omnis explicabo est laborum nisi. Nam porro reprehenderit corporis ducimus.</p>'
            ),
            'customer_id' => Customer::factory(),
            'category_id' => Category::factory(),
            'created_by' => User::factory(),
            'opened_to' => User::factory(),
            'status' => \Arr::random(TicketStatus::cases()),
            'extra_data' => [
                'key1' => 'Value',
                'key2' => 'Value',
            ],
        ];
    }
}
