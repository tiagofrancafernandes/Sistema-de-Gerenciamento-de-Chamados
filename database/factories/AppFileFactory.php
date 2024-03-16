<?php

namespace Database\Factories;

use App\Models\Ticket;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Symfony\Component\Finder\Finder;
use Illuminate\Support\Arr;
use App\Helpers\LocalFileHandler;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AppFile>
 */
class AppFileFactory extends Factory
{
    protected static ?array $files = null;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'extra_data' => [
                'file_info' => static::getRandomFile()?->toArray() ?? [],
            ],
            'name' => fn (array $attr) => $attr['extra_data']['file_info']['filename'] ?? null,
            'original_name' => fn (array $attr) => $attr['extra_data']['file_info']['originalName'] ?? null,
            'extension' => fn (array $attr) => $attr['extra_data']['file_info']['extension'] ?? null,
            'disk' => fn (array $attr) => $attr['extra_data']['file_info']['disk'] ?? '',
            'path' => fn (array $attr) => $attr['extra_data']['file_info']['path_on_storage'] ?? null,
            'size' => fn (array $attr) => $attr['extra_data']['file_info']['size'] ?? null,
            'expires_in' => null,
            'public' => true,
            'uploaded_by' => User::inRandomOrder()->first() ?: User::factory(),
            'refclass_id' => (Ticket::inRandomOrder()->first() ?: Ticket::factory()->createOne())?->id,
            'refclass_type' => fn (array $attr) => ($attr['refclass_id'] ?? null) ? Ticket::class : null,
        ];
    }

    public static function getRandomFile(null|string|array $names = null, ?string $key = null): mixed
    {
        $files = static::getFakeFileList($names);

        if (!$files) {
            return null;
        }

        $data = Arr::random($files);

        $filePath = $data['absoluteFilePath'] ?? null;
        $fileInfo = LocalFileHandler::copyFile($filePath, directory: 'fake-files');

        return $key && $fileInfo ? Arr::get($fileInfo?->toArray(), $key) : $fileInfo;
    }

    public static function getFakeFileList(null|string|array $names = null): array
    {
        $names = array_filter((array) $names, fn ($item) => $item && is_string($item));
        $names = $names ? $names : ['*.jpg', '*.png', '*.md', '*.pdf', '*.txt'];
        $key = md5(implode('', $names) . __METHOD__);

        if (static::$files[$key] ?? []) {
            return static::$files[$key] ?? [];
        }

        $finder = (new Finder())->files();

        if ($names) {
            $finder->name($names);
        }

        $finder->in(database_path('fake-data'));

        foreach ($finder as $file) {
            static::$files[$key][] = [
                'absoluteFilePath' => $file->getRealPath(),
            ];
        }

        return static::$files[$key] ?? [];
    }
}
