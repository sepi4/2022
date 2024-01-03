namespace _16;

public static class Program
{
    public static void Main()
    {
        var file = "input.txt";
        // var file = "example.txt";
        var path = $"/Users/serpo/tutorials/advent-of-code/2023/c#/16/{file}";
        var input = File.ReadAllText(path);

        // // part 1
        // Console.WriteLine(
        //         Part1(input.Split("\n"))
        //     );

        // // part 2
        // Console.WriteLine(
        //         Part2(input.Split("\n"))
        //     );
    }

    public static int Part2(string[] input)
    {
        var ss = new List<(string[], int, int, Direction)>();
        for (var i = 0; i < input.Length; i++)
        {
            ss.Add((input, i, -1, Direction.Right));
            ss.Add((input, i, input[0].Length, Direction.Left));
        }

        for (var i = 0; i < input[0].Length; i++)
        {
            ss.Add((input, -1, i, Direction.Down));
            ss.Add((input, input.Length, i, Direction.Up));
        }

        var max = -1;
        foreach (var (a, b, c, d) in ss)
        {
            var res = HowManyEnlightened(a, b, c, d);
            if (res > max)
            {
                max = res;
            }
        }

        return max;
    }

    public static int Part1(string[] input)
    {
        return HowManyEnlightened(input, 0, -1, Direction.Right);
    }


    public static int HowManyEnlightened(string[] input, int startingY, int startingX, Direction startingDirection)
    {
        var beams = new Queue<Beam>();
        var enlightened = new Dictionary<(int, int), Direction>();
        beams.Enqueue(new Beam(startingY, startingX, startingDirection));
        var i = 0;
        while (beams.Count > 0)
        {
            var beam = beams.Dequeue();

            if (i++ > 0)
            {
                enlightened[(beam.Y, beam.X)] = beam.MovingDirection;
            }

            beam.Move();

            // over some limit
            if (beam.Y < 0 || beam.Y >= input.Length || beam.X < 0 || beam.X >= input[0].Length)
            {
                beam.Moving = false;
                continue;
            }

            var current = input[beam.Y][beam.X];
            var dirs = GetDirections(current, beam);
            foreach (var dir in dirs)
            {
                if (enlightened.ContainsKey((beam.Y, beam.X)) && enlightened[(beam.Y, beam.X)] == dir)
                {
                    continue;
                }

                beams.Enqueue(new Beam(beam.Y, beam.X, dir));
            }
        }

        return enlightened.Count;
    }

    public static List<Direction> GetDirections(char v, Beam b)
    {
        switch (v)
        {
            case '/':
                return b.MovingDirection switch
                {
                    Direction.Up => [Direction.Right],
                    Direction.Down => [Direction.Left],
                    Direction.Left => [Direction.Down],
                    Direction.Right => [Direction.Up],
                    _ => [b.MovingDirection]
                };
            case '\\':
                return b.MovingDirection switch
                {
                    Direction.Up => [Direction.Left],
                    Direction.Down => [Direction.Right],
                    Direction.Left => [Direction.Up],
                    Direction.Right => [Direction.Down],
                    _ => [b.MovingDirection]
                };
            case '-':
                return b.MovingDirection switch
                {
                    Direction.Up => [Direction.Left, Direction.Right],
                    Direction.Down => [Direction.Left, Direction.Right],
                    _ => [b.MovingDirection]
                };
            case '|':
                return b.MovingDirection switch
                {
                    Direction.Left => [Direction.Up, Direction.Down],
                    Direction.Right => [Direction.Up, Direction.Down],
                    _ => [b.MovingDirection]
                };
        }

        return [b.MovingDirection];
    }

    public enum Direction
    {
        Up,
        Down,
        Left,
        Right
    }

    public class Beam
    {
        public Direction MovingDirection { get; set; }
        public bool Moving { get; set; }
        public int Y { get; set; }
        public int X { get; set; }

        public Beam(int y, int x, Direction direction)
        {
            Moving = true;
            MovingDirection = direction;
            Y = y;
            X = x;
        }

        public void Move()
        {
            if (!Moving)
            {
                return;
            }

            switch (MovingDirection)
            {
                case Direction.Up:
                    Y--;
                    break;
                case Direction.Down:
                    Y++;
                    break;
                case Direction.Left:
                    X--;
                    break;
                case Direction.Right:
                    X++;
                    break;
            }
        }
    }
}