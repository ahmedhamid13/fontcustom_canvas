require_relative 'lib/fontcustom_canvas/version'

Gem::Specification.new do |spec|
  spec.name          = "fontcustom_canvas"
  spec.version       = FontcustomCanvas::VERSION
  spec.authors       = ["ahmed-abd-elhamid"]
  spec.email         = ["eng.a.abdelhamid@outlook.com"]

  spec.summary       = "This gem for font customization of canvas-lms"
  spec.description   = "This gem for font customization of canvas-lms"
  spec.homepage      = "https://github.com/Ahmed-Abd-elhamid/fontcustom_canvas"
  spec.license       = "MIT"
  spec.required_ruby_version = Gem::Requirement.new(">= 2.3.0")

  # spec.metadata["allowed_push_host"] = "TODO: Set to 'http://mygemserver.com'"

  spec.metadata["homepage_uri"] = spec.homepage
  spec.metadata["source_code_uri"] = spec.homepage
  # spec.metadata["changelog_uri"] = "TODO: Put your gem's CHANGELOG.md URL here."

  # Specify which files should be added to the gem when it is released.
  # The `git ls-files -z` loads the files in the RubyGem that have been added into git.
  spec.files         = Dir.chdir(File.expand_path('..', __FILE__)) do
    `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
  end
  spec.bindir        = "exe"
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]
end
